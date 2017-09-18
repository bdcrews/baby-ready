import React from 'react';
import {connect} from 'react-redux';
import {Panel,
  ListGroup,
  ListGroupItem, 
  Button,
  ButtonGroup
  } from 'react-bootstrap';
import {setTipsIndex} from '../actions/tips';

const titlePanel = (<h3>Tips</h3>);

export class SmallTips extends React.Component {
  render() {
    const tipIndex = this.props.tipIndex;
    const tips = this.props.tips;
    return(
      <Panel header={titlePanel}>
        <ListGroup>
          <ListGroupItem header={tips[tipIndex].title}>{tips[tipIndex].text}</ListGroupItem>
        </ListGroup>
        <ButtonGroup >
          <Button onClick={()=>{this.props.dispatch(setTipsIndex(tipIndex - 1))}}>Prev</Button>
          <Button onClick={()=>{this.props.dispatch(setTipsIndex(tipIndex + 1))}}>Next</Button>
        </ButtonGroup >
      </Panel>
      );
  }
}

const mapStateToProps = state => {
    return {
        tipIndex: state.tips.tipIndex,
        tips: state.tips.tips
    };
};


export default connect(mapStateToProps)(SmallTips);