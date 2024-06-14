import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";

actor BlogApp {

    type Post = {
        title: Text;
        description: Text;
        upvotes: Nat;
        downvotes: Nat;
        isPublic: Bool;
    };

    stable var stablePosts : [(Principal, Post)] = [];

    let posts = HashMap.HashMap<Principal, Post>(0, Principal.equal, Principal.hash);


    system func preupgrade() {
      stablePosts := Iter.toArray(posts.entries());
    };

    system func postupgrade() {
      for ((p,post) in stablePosts.vals()){
        posts.put(p,post);
      };
    };

    public shared({ caller }) func createPost(title: Text, description: Text): async Result.Result<(), Text> {
        if (title == "" or description == "") {
            return #err("Title and description must not be empty");
        };

        if (Text.size(title) > 125) {
            return #err("Title must not exceed 125 characters");
        };

        if (Principal.isAnonymous(caller)){
            return # err("Anonymous principle cannot create post");
        };

        let newPost: Post = {
            title = title;
            description = description;
            upvotes : Nat = 0;
            downvotes : Nat = 0;
            isPublic = false;
        };

        switch (posts.get(caller)) {
            case (null) {
                posts.put(caller, newPost);
                return #ok(());
            };
            case (?oldPost) {
                return #err("Your principal is already associated with a post");
            };
        };
    };
    
    public query func getAllPosts(): async [Post] {
        let iterator = posts.vals();
        return Iter.toArray(iterator);
    };




    
}
