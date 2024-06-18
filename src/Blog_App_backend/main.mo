import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Validation "Validation";
import Types "Types";

actor BlogApp {

    type Post = Types.Post;

    stable var stablePosts : [(Principal, Post)] = [];

    let posts = HashMap.HashMap<Principal, Post>(0, Principal.equal, Principal.hash);

    /// Function for preUpgrade
    system func preupgrade() {
        stablePosts := Iter.toArray(posts.entries());
    };

    /// Function for postUpgrade
    system func postupgrade() {
        for ((p, post) in stablePosts.vals()) {
            posts.put(p, post);
        };
    };

    /// Function to create posts
    public shared({ caller }) func createPost(title: Text, description: Text): async Result.Result<(), Text> {
        // Validate the post
        switch (Validation.validatePost(title, description)) {
            case (#err(errorMessage)) {
                return #err(errorMessage);
            };
            case (#ok()) {

            };  
        };

        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principal cannot create post");
        };

        let newPost: Post = {
            title = title;
            description = description;
            upvotes = 0;
            downvotes = 0;
            isPublic = false;
        };
        

        
        posts.put(caller, newPost);
        return #ok()
        
        
    };

    // Function to get all posts
    public query func getAllPosts(): async [Post] {
        return Iter.toArray(posts.vals());
    };
}
