import React from "react"
import Post from "./Post/Post"
import { addPostActionCreator } from "../../../redux/profile-reducer"
import { connect } from "react-redux"
import MyPostsForm from "./MyPostsForm"
import { reduxForm } from "redux-form"

const MyPosts = React.memo((props) => {
    let post =
        [...props.posts]
            .reverse()
            .map((m, id) => <Post key={id} post={m.message} />)
    let onSubmit = (formData) => {
        props.addPost(formData.post)
    }
    return (
        <div style={{ 'margin': '10px' }}>
            <h1>My posts</h1>
            <div>
                {post}
            </div>
            <div>
                <PostReduxForm onSubmit={onSubmit} />
            </div>
        </div>
    )
})

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => {
            dispatch(addPostActionCreator(post))
        }
    }
}

let PostReduxForm = reduxForm({ form: 'post' })(MyPostsForm)

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)