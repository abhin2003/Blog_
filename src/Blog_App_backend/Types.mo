import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";

module {
    public type Post = {
        title: Text;
        description: Text;
        upvotes: Nat;
        downvotes: Nat;
        isPublic: Bool;
    };
}
