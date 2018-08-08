({
    doInit  : function(component, newMessage) {
        //get session id
        var action = component.get("c.getSessionID");
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var sessionID = '00D' + response.getReturnValue();
                component.set("v.SessionID", sessionID);

                //subscribe to streaming channel
                component.subscribeToStreamingChannel(component);
            }
        });

        $A.enqueueAction(action);
    },
    subscribeToStreamingChannel : function(component, event, helper) {
        var sessionID = component.get("v.SessionID");
        
        //subscribe to streaming channel
        var pushTopicName = component.get("v.PushTopicName");
        
        //Initialize Streaming api connection
		$.cometd.init({
            url:'/cometd/36.0',
            requestHeaders: { Authorization: 'OAuth ' + sessionID},
            appendMessageTypeToURL : false
        });
        
        // Subscribe to DailyMetrics streaming push topic
        $.cometd.subscribe('/topic/' + pushTopicName, function(message){
            helper.onNewMessage(component, message);
        });
	}
})