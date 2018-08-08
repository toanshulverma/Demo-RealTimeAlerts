({
	onNewMessage : function(component, newMessage) {
        /* handled for push notification */
        
		var displayformat = component.get("v.MessageFormat");
        var fieldNames = component.get("v.FieldsToDisplay");
        
        var fieldValues = [];
        var record = newMessage.data.sobject;
        
        //retrieve all fields to be displayed
        fieldNames.forEach( function(v, i){
            if(record[v] !== undefined){
                fieldValues.push(record[v]);
            }
            else{
                fieldValues.push("");
            }
        } );
        
        //generate new message and add to messagelist
        var newMessage = this.formatString(displayformat, fieldValues);
        
        //retrieve existing messages list
        var messages = component.get("v.Messages");
        if(messages === null){
            messages = [];
        }
        
        //add new message to list
        messages.push(newMessage);
        
        //set updated message list for view
        component.set("v.Messages", messages);
    },
    formatString : function(messageFormat, values){
        /* formats a string in desired format */
        values.forEach( function(v,i){
        	var pattern = '[{]' + i + '[}]';
        	var regex = new RegExp(pattern, "g");
            
            messageFormat = messageFormat.replace(regex,v);
        });
        return messageFormat;
    },
    getSessionID : function(callBack){
        //Get a valid Session Id
        var sessionAction = component.get("c.getUserSession");

        sessionAction.setCallback(this, function (a) {
            var sid = a.getReturnValue();
            callBack(sid);
        });
    }
})