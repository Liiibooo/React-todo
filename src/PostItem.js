import React, { Component } from 'react'
import './PostItem.css'

class PostItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editing: false,
            post: props.post
        }
        this.handleVote = this.handleVote.bind(this)
        this.handleEditPost = this.handleEditPost.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.post !== nextProps.post) {
            this.setState({
                post: nextProps.post
            })
        }
    }

    //点赞事件
    handleVote() {
        this.props.onVote(this.props.post.id)
    }
    // 保存/编辑按钮事件
    handleEditPost() {
        const editing = this.state.editing;
        if (editing) {
            this.props.onSave({
                ...this.state.post,
                date: this.getFormatDate()
            })
        }
        this.setState({
            editing: !editing
        })
    }

    //标题textare变化
    handleTitleChange(event) {
        const newPost = { ...this.state.post, title: event.target.value }
        this.setState({
            post: newPost
        })
    }

    getFormatDate() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1;
        let nowDate = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (nowDate >= 0 && nowDate <= 9) {
            nowDate = "0" + nowDate;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        let formateDate = `${year}-${month}-${nowDate} ${hours}:${minutes}:${seconds}`
        return formateDate
    }

    render() {
        const { post } = this.state;
        return (
            <li className='item'>
                <div className="title">
                    {
                        this.state.editing
                            ?
                            <form>
                                <textarea
                                    value={post.title}
                                    onChange={this.handleTitleChange}
                                />
                            </form>
                            : post.title}
                </div>
                <div>
                    创建人:<span>{post.author}</span>
                </div>
                <div>
                    创建时间:<span>{post.date}</span>
                </div>
                <div>
                    <button onClick={this.handleVote}>
                        点赞
                    </button>
                    &nbsp;
                    <span>
                        {post.vote}
                    </span>
                </div>
                <div>
                    <button onClick={this.handleEditPost}>
                        {this.state.editing ? '保存' : '编辑'}
                    </button>
                </div>
            </li>
        )
    }
}

export default PostItem