import User from './User';

class Message {
    constructor({ id, user, content, at}) {
        this.id = id;
        this.user = new User(user);
        this.content = content;
        this.at = new Date(at * 1000);
    }
}

export default Message;