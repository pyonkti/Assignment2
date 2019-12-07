// VARIABLE DECLARATION
var StateIdle = new UState("Idle");
StateIdle.Update = function(RefObject) {

    // perfrom state specific action e.g. play idle animation

    // check to see if an event occured that would 
    // require us to switch to another state
    if( this.Count < 3 ) {
        console.log( "I am the Idle State and am now switching to state " + this.NextState.StateName );
        RefObject.State = this.NextState;
        this.Count++;
        return true;
    } else {
        return false;
    }
}    
var StateRunning = new UState("Running");
// StateRunning.Update = function(RefObject) {
//     // perfrom state specific action e.g. play idle animation

//     // check to see if an event occured that would 
//     // require us to switch to another state
//     if( this.Count < 3 ) {
//         console.log( "Switching from State " + this.StateName + " to " + this.NextState.StateName );
//         RefObject.State = this.NextState;
//         this.Count++;
//         return true;
//     } else {
//         return false;
//     }
// }    
StateIdle.NextState = StateRunning;
StateRunning.NextState = StateIdle;
var ContextObject = new UObject(StateIdle);

// FUNCTION DECLARATION
function UState(RefStateName) {
    this.Count = 0;
    this.StateName = RefStateName;
    this.NextState = null;
    this.Update = function(RefObject) { 
        console.log("ERROR UPDATE FUNCTION NEEDS TO BE OVERRIDDEN!!!");
        return false;
    }    
}

function UObject(RefInitialState) {
    this.State = RefInitialState;
    this.Update = function() {
        return this.State.Update(this);
    }    
}

// RUN THE APPLICATION
while( ContextObject.Update() );
console.log( "Application exits properly.");
