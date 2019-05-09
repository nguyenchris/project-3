import React, { Component } from 'react';
import {
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  Row,
  Badge,
  UncontrolledTooltip,
  Collapse,
  Input
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class SinglePost extends Component {
  state = {
    openedCollapses: [],
    likeObj: null
  };

  componentDidMount() {
    this.checkIfLiked();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.post.likes.length !== this.props.post.likes.length) {
      this.checkIfLiked();
    }
  }

  collapsesToggle = (e, collapse) => {
    e.preventDefault();
    let openedCollapses = [...this.state.openedCollapses];
    if (openedCollapses.includes(collapse)) {
      this.setState({
        openedCollapses: openedCollapses.filter(item => item !== collapse)
      });
    } else {
      openedCollapses.push(collapse);
      this.setState({
        openedCollapses: openedCollapses
      });
    }
  };

  checkIfLiked = () => {
    const likeIndex = this.props.post.likes.findIndex(like => like.user === this.props.userId);
    if (likeIndex !== -1) {
      const likeObj = this.props.post.likes[likeIndex];
      this.setState({
        likeObj: likeObj
      });
    } else {
      this.setState({
        likeObj: null
      });
    }
  };
  render() {
    let isOnline = false;
    if (this.props.usersOnline) {
      isOnline = this.props.usersOnline.some(user => user._id === this.props.post.creator._id);
    }
    return (
      <Col md="4">
        <Card className="card-testimonial post-card">
          <CardHeader className="card-header-avatar">
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <img
                alt={this.props.post.creator.name}
                className="img img-raised"
                id={this.props.tooltipId}
                src={this.props.post.creator.imageUrl}
              />
            </Link>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h4">{this.props.post.content}</CardTitle>
          </CardBody>
          <CardFooter className="post-footer">
            <hr />
            <Link
              to={{
                pathname: `/user/profile/${this.props.post.creator._id}`
              }}
            >
              <h6 id={this.props.tooltipId2}>{this.props.post.creator.name}</h6>
            </Link>
            <h6>
              {isOnline ? (
                <span className="text-success">Online</span>
              ) : (
                <span className="text-danger">Offline</span>
              )}
            </h6>
            <h6 className="text-muted post-time">Posted {this.props.time}</h6>
            <Row>
              <Col>
                <Button
                  color={this.state.likeObj ? 'primary' : 'info'}
                  className="btn-link"
                  type="button"
                  onClick={() => this.props.updateLike(this.props.post._id, this.state.likeObj)}
                >
                  <i className="tim-icons icon-heart-2" /> {'  '}
                  {this.state.likeObj ? 'Liked' : 'Like'}{' '}
                  <Badge className="badge-like" color={this.state.likeObj ? 'primary' : 'info'}>
                    {this.props.post.likes.length}
                  </Badge>
                </Button>
              </Col>
              <Col>
                <Button color="info" className="btn-link" type="button">
                  Comment
                </Button>
              </Col>
            </Row>
            <div
              aria-multiselectable={false}
              className="card-collapse"
              id="accordion"
              role="tablist"
            >
              <Card className="card-plain view-comments-card">
                <CardHeader className="view-comments-header" role="tab">
                  <a
                    aria-expanded={this.state.openedCollapses.includes('collapseOne')}
                    href="#pablo"
                    data-parent="#accordion"
                    data-toggle="collapse"
                    onClick={e => this.collapsesToggle(e, 'collapseOne')}
                    className={`view-comments ${
                      this.state.openedCollapses.includes('collapseOne') ? 'text-info' : ''
                    }`}
                  >
                    View Comments{' '}
                    <Badge className="badge-comments" color="info">
                      {this.props.post.comments.length}
                    </Badge>
                    <i className="tim-icons icon-minimal-down text-info" />
                  </a>
                </CardHeader>
                <Collapse
                  role="tabpanel"
                  isOpen={this.state.openedCollapses.includes('collapseOne')}
                >
                  <CardBody className="view-comments-body">
                    {/* {this.props.post.comments.length === 0 ? 'No Comments' : null} */}
                    <Row className="comment-input-row">
                      <div className="comment-image-user">
                        <img src={this.props.post.creator.imageUrl} alt="" />
                      </div>
                      <Input
                        className="comment-input"
                        type="text"
                        placeholder="Write a comment..."
                        color="info"
                      />
                    </Row>
                    <Row className="comment-wrapper">
                      <Col sm="3">
                        <div className="comment-user-info">
                          <div className="comment-image">
                            <img src={this.props.post.creator.imageUrl} alt="" />
                          </div>
                        </div>
                      </Col>

                      <Col sm="9">
                        <p className="comment-text">
                          <span className="comment-name">
                            <Link
                              to={{
                                pathname: `/user/profile/${this.props.post.creator._id}`
                              }}
                            >
                              {this.props.post.creator.name}
                            </Link>
                          </span>
                          hi this is a comment. how much as laksgasngajn q tqn q toqj tuiqwtiqntn
                          ast ast
                        </p>
                      </Col>
                    </Row>
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </CardFooter>
          <UncontrolledTooltip delay={0} placement="bottom" target={this.props.tooltipId}>
            View Profile
          </UncontrolledTooltip>
          <UncontrolledTooltip delay={0} placement="top" target={`${this.props.tooltipId2}`}>
            View Profile
          </UncontrolledTooltip>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersOnline: state.feed.usersOnline,
    userId: state.auth.userId
  };
};

export default connect(
  mapStateToProps,
  null
)(SinglePost);
