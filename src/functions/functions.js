import firebase from 'firebase';

export const timeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = Math.floor(seconds / 31536000);
    
    if(isNaN(interval)){
        return " less than a second"
    }
    if (interval > 1) {
      return interval + "y";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + "m";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + "d";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + "h";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + "min";
    }
    return Math.floor(seconds) + "s";
  }
export const uiConfig = {
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  // tosUrl and privacyPolicyUrl accept either url string or a callback
  // function.
  // Terms of service url/callback.
  tosUrl: '<your-tos-url>',
  // Privacy policy url/callback.
  privacyPolicyUrl: function() {
    window.location.assign('<your-privacy-policy-url>');
  },
  callbacks: { 
    signInSuccess: () => false 
  }


   
  
};