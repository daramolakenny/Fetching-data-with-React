import React, { Component } from 'react';
import axios from 'axios';

class Pages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [] // Initialize data as an empty array to hold posts
    };
  }

  componentDidMount() {
    // Fetch existing posts when the component mounts
    this.fetchPosts();
  }

  fetchPosts = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        this.setState({ data: response.data });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const { userId, title, body } = this.state;
    
    axios
      .post('https://jsonplaceholder.typicode.com/posts', {
        userId,
        title,
        body
      })
      .then(response => {
        // Optionally refresh posts after adding a new one
        this.fetchPosts(); // Fetch all posts again including the newly added one
        this.setState({ userId: '', title: '', body: '' }); // Clear form fields
      })
      .catch(error => {
        console.error("Error posting data:", error);
      });
  }

  render() {
    const { userId, title, body, data } = this.state;

    return (
      <div className='container'>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={this.changeHandler}
            />
          </div>

          <div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={this.changeHandler}
            />
          </div>

          <div>
            <input
              type="text"
              name="body"
              value={body}
              onChange={this.changeHandler}
            />
          </div>

          <button type='submit'>Submit</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>Title</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.title}</td>
                <td>{item.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Pages;