import React, { Component } from 'react';
import './App.css';
import 'isotope-layout';
var FontAwesome = require('react-fontawesome');

class Profile extends Component{
  calculateGenderLogo(gender){
    if(gender==='M')
    {
    return (<FontAwesome
        className='genderIcon' name='rocket'
        size='2x' spin
      />);
    }
    else
    return (<i className="fa fa-venus genderIcon"></i>);
  }
  generateProfilePicture(imageUrl){
    return (<img src={`data:image/png;base64,${imageUrl}`} alt="gibberish"/>
    );
  }
  render() {
    return (
      <div className="profile-card">
        <div className="image" >
          {this.generateProfilePicture(this.props.image)}
        </div>
        <div className="upperhalf">
          <h3>{this.props.name}</h3>
          <span>
          {this.calculateGenderLogo(this.props.gender)}
          </span>
          {this.props.age} years old from {this.props.city}
          <br/>
        </div>
        <div className="lowerhalf" >
          <span className="headers">Works At</span>
          <br/>
          {this.props.job} at {this.props.workplace}
          <hr/>
          <span className="headers">About</span>
          <br/>
          {this.props.about}
          <hr/>
        </div>
      </div>
    );
  }
}
class ProfileList extends Component{

  constructor(props){
   super(props);
   this.state = {
     profiles : []
     };
   };
  componentDidMount(){
    this.getProfiles().then((res)=>{
      console.log(this.setState({profiles: res.profiles}));
    }).catch((err)=>{
      console.log(err);
    });
  }
    getProfiles = async () => {
    const response = await fetch('/home');
    const body = await response.json();
    if(response.status !== 200)
    throw Error(body.message);
    return body;
  };
  render() {
    var profiles = this.props.profiles.map(function(p, i){
      var allProps = {name : p.name, gender: p.gender, age: p.age, city: p.city, job: p.job, workplace: p.workplace, about: p.about, image: p.image, key: i}
    return(
      <Profile {...allProps} />
      );
    });
    return (
      <div className='container' data-isotope='{ "itemSelector": ".profile-card", "percentPosition": "true" }'>
        {profiles}
      </div>
    );
  }
}
/*ReactDOM.render(<ProfileList profiles={profiles} />, document.getElementById("app"));*/
/* data-isotope='{ "itemSelector": ".profile-card", "percentPosition": "true" }'  data-infinite-scroll='{ "path": ".pagination__next", "append": ".profile-card", "history": false }'*/
export default ProfileList;
