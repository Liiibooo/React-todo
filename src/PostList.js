import React, { Component } from 'react'
import PostItem from './PostItem'


class PostList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.timer = null
        this.handleVote = this.handleVote.bind(this);
        this.handleSave = this.handleSave.bind(this);
    }
    componentDidMount() {
        //模拟请求
        this.timer = setTimeout(() => {
            this.setState({
                posts: [
                    {
                        id: 1,
                        title: '大家一起来学习react吧',
                        author: '张三',
                        date: '2019-12-12 20:40:00',
                        vote: 0
                    },
                    {
                        id: 2,
                        title: '前端框架你最喜欢用哪个？',
                        author: '李四',
                        date: '2019-12-12 20:40:00',
                        vote: 0
                    },
                    {
                        id: 3,
                        title: 'web App的时代已经来了',
                        author: '王五',
                        date: '2019-12-12 20:40:00',
                        vote: 0

                    }
                ]
            })
        }, 1000);
    }
    componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }
    handleVote(id) {
        const posts = this.state.posts.map(item => {
            const newItem = item.id === id ? { ...item, vote: ++item.vote } : item;
            return newItem;
        })
        this.setState({
            posts
        })
    }
    handleSave(post) {
        const posts = this.state.posts.map(item => {
            const newItem = item.id === post.id ? post : item;
            return newItem;
        })
        this.setState({
            posts
        })
    }
    render() {
        return (
            <div>
                <h2>帖子列表</h2>
                <ul>
                    {this.state.posts.map(item =>
                        <PostItem
                            key={item.id}
                            post={item}
                            onVote={this.handleVote}
                            onSave={this.handleSave}
                        />
                    )}
                </ul>
            </div>
        )
    }
}

export default PostList