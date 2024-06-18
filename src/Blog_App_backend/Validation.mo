import Text "mo:base/Text";
import Result "mo:base/Result";
import Principal "mo:base/Principal";


module {
    public func validatePost(title: Text, description: Text, caller: Principal): Result.Result<(), Text> {
        if (title == "" or description == "") {
            return #err("Title and description must not be empty");
        };
        if (Text.size(title) > 125) {
            return #err("Title must not exceed 125 characters");
        };
        if (Principal.isAnonymous(caller)) {
            return #err("Anonymous principal cannot create post");
        };


        return #ok(());
    };
}
