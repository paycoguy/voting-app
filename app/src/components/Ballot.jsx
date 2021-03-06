/** @jsx React.DOM */
'use strict'
var React = require('react')
var PollVote = require('./PollVote')
var VoteResults = require('./VoteResults')
module.exports =  React.createClass({
    loadPoll:function(){
     var pollId = this.props.id;
     
      var pollApiUrl = "/openapi/getPoll";
        console.log("loading poll " + pollId);
         $.ajax({
          type: "GET",
          url: pollApiUrl,
          data: {id:pollId},
          contentType: "application/json",
          success: function(data){
             console.log("data successfully retrieved", data);
             this.setState({
                 poll:data
              });
             
                  }.bind(this),
          error: function(data){
             console.log("error receiving data", data);
                  }.bind(this),
          dataType: 'json'
        });
    },
    componentDidMount:function(){
      this.loadPoll();
    },
    handlePollSubmit:function(optionSelected){
        var voteApiUrl = "/api/vote";
        console.log("poll submitted",optionSelected);
        $.ajax({
          type: "POST",
          url: voteApiUrl,
          data: JSON.stringify(optionSelected),
          contentType: "application/json",
          success: function(data){
              console.log("Vote submitted", data);
              this.setState({showPage:'voteResults'})
                  }.bind(this),
          error: function(data){
             console.log("Error submitting vote", data);
                  }.bind(this),
          dataType: 'json'
        });
    },
    
      getInitialState: function() {
          return { 
              poll:{
                  name:'',
                  options:[{name:''}]
              },
              showPage:'pollVote'
          };
      },
      render:function(){
        return(
          <div>
            <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
            {this.state.showPage==="pollVote" ? 
              <PollVote poll={this.state.poll} onSubmit={this.handlePollSubmit}/>:
              <VoteResults poll={this.state.poll}/>
            }
            </div>
            <div className="col-md-4"></div>
            </div>
          </div>
      
      );
  }
  
});
 
  