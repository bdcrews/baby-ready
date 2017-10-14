import React from 'react';
import {connect} from 'react-redux';

export class StyleTheme extends React.Component {


  getColor(colorTheme) {
    let returnValue = {};
    switch(colorTheme) {
        case 'blue':
            returnValue.color = '#fff';
            returnValue.colorInvert = '#07293D';
            returnValue.backgroundColor = '#1995dc';
            returnValue.backgroundColorLt = 'rgba(25, 149, 220, .2)'; //'#eeeeee';
            returnValue.backgroundTransparent = 'rgba(25, 149, 220, .8)';
        break;
        case 'green':
            returnValue.color = '#fff';
            returnValue.colorInvert = '#207020';
            returnValue.backgroundColor = '#50A050';
            returnValue.backgroundColorLt = 'rgba(80,160,80,.2)';
            returnValue.backgroundTransparent = 'rgba(80,160,80, .8)';
        break;
        case 'pink':
            returnValue.color = '#fff';
            returnValue.colorInvert = '#700051';
            returnValue.backgroundColor = '#C80090';
            returnValue.backgroundColorLt = 'rgba(200,0,144,.2)';
            returnValue.backgroundTransparent = 'rgba(200,0,144, .8)';
        break;
        default:
        break;
    }
    return returnValue;
}

  render() {
    const colorTheme = this.getColor(this.props.colorTheme);
    const userStyle = `
	    #BR .NavBar,
      #BR .panel-heading {
          color: ` + colorTheme.color + `;
          background-color: ` + colorTheme.backgroundColor + `;

          background-image: -webkit-linear-gradient(rgba(0,0,0,.1), rgba(256,256,256,.1) 60%,rgba(0,0,0,.1));
          background-image: -o-linear-gradient(rgba(0,0,0,.1), rgba(256,256,256,.1) 60%,rgba(0,0,0,.1));
          background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,.1)), color-stop(60%, rgba(256,256,256,.1)), to(rgba(0,0,0,.1)));
          background-image: linear-gradient(rgba(0,0,0,.1), rgba(256,256,256,.1) 60%,rgba(0,0,0,.1));
          background-repeat: no-repeat;
      }
      @media only screen and (max-width: 767px) {
        #BR .navbar-collapse{
          background-color: ` + colorTheme.backgroundColor + `;
        }
      }
      #BR h1 small{
        color: ` + colorTheme.colorInvert + `;
        margin-left: 20px;
      }

      #BR h4,      
      #BR h1 span{
        color: ` + colorTheme.colorInvert + `;
      }

      #BR .panel-body {
          background-color: ` + colorTheme.backgroundColorLt + `;
          background-image: -webkit-linear-gradient(rgba(255,255,255,.3), rgba(256,256,256,.1) 60%,rgba(255,255,255,.3));
          background-image: -o-linear-gradient(rgba(255,255,255,.3), rgba(256,256,256,.1) 60%,rgba(255,255,255,.3));
          background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(255,255,255,.3)), color-stop(60%, rgba(256,256,256,.1)), to(rgba(255,255,255,.3)));
          background-image: linear-gradient(rgba(255,255,255,.3), rgba(256,256,256,.1) 60%,rgba(255,255,255,.3));
          background-repeat: no-repeat;
          border: 1px solid ` + colorTheme.backgroundColor + `;
          border-radius: 0 0 6px 6px;
      }

      #BR .jumbotron {
          background-color: `+ colorTheme.backgroundTransparent + `;
          color: `+ colorTheme.color + `;

          background-image: -webkit-linear-gradient(rgba(0,0,0,.1), rgba(256,256,256,.1) 60%,rgba(0,0,0,.1));
          background-image: -o-linear-gradient(rgba(0,0,0,.1), rgba(256,256,256,.1) 60%,rgba(0,0,0,.1));
          background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,.1)), color-stop(60%, rgba(256,256,256,.1)), to(rgba(0,0,0,.1)));
          background-image: linear-gradient(rgba(0,0,0,.1), rgba(256,256,256,.1) 60%,rgba(0,0,0,.1));
          background-repeat: no-repeat;
          padding-bottom: 60px;
      }

      #BR .registration-from label, 
      #BR .jumbotron>h3,
      #BR .navbar label,
      #BR .navMenuButton>a,
      #BR h3 {
        color: ` + colorTheme.color + `;
        text-shadow: 1px 1px 1px #000, 0 0 25px black;
      }

      #BR label {
        color: ` + colorTheme.colorInvert + `;
        text-shadow: 0 0 25px white;
      }

      #BR .panel,
      #BR .jumbotron {
          box-shadow: 6px 6px 1px rgba(0,0,0,.4);
      }
      #BR .table-responsive {
		    border-width: 4px;
		    border-style: groove;
        border-color: ` + colorTheme.backgroundColor + `;
        background-color: rgba(255,255,255,.9);
      }
      `;

	return(
      <style type="text/css">{userStyle}</style>
    );
  }
}

const mapStateToProps = state => ({
  colorTheme: state.user.data.colorTheme
});

export default connect(mapStateToProps)(StyleTheme);