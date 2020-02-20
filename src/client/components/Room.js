import React from 'react';
import { observer } from 'mobx-react';

@observer
export default class Room extends React.Component {
    state = { message: null, loading: true };

    componentDidMount() {
        setTimeout(() => {
            this.setState(state => ({...state, loading: false}))
            this.inputMessageInputRef.focus()
        }, 500);
    }

    setMessage = (message) => {
        this.setState(state => ({...state, message}))
    }

    submit = (e) => {
        e.preventDefault();
        setTimeout(() => {
            this.props.room.appendMessage({
                id: this.props.room.messages.length + 100,
                user: JSON.parse(JSON.stringify(this.props.user)),
                content: this.state.message,
                at: parseInt((new Date).getTime()/1000),
            })
            this.setState(state => ({...state, message: null}))
        }, 200);
    }

    render() {
        const { room } = this.props;

        return (
            <div className='chat-room'>
                <h1>{this.state.loading && !room ? '로딩 중입니다..' : room && room.title }</h1>
                <div className='chat-room-messages'>
                    <ul>
                        {room && room.messages.map(message => (
                            <li key={message.id}>
                                <span>
                                    <img src={message.user.avatarUrl} width={20} />
                                    <span>{message.user.nickname}</span>
                                    <small>{message.at.toLocaleString()}</small>
                                </span>
                                <p>{message.content}</p>
                            </li>
                        ))}
                        <li>
                            <form onSubmit={this.submit}>
                                <input
                                  ref={ref => this.inputMessageInputRef = ref}
                                  type='text'
                                  value={this.state.message}
                                  onChange={e => this.setMessage(e.target.value)}
                                  disable={this.state.loadign}
                                />
                            </form>
                        </li>
                    </ul>
                    <button onClick={this.props.exit}>나가기</button>
                </div>
                <div className='chat-room-users'>
                    <ul>
                        {room && room.users.map(user => (
                            <li key={user.id}>
                                <img src={user.avatarUrl} width={20} />
                                <span>{user.nickname}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
}