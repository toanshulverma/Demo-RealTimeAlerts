<aura:application access="global">
	<c:AlertsViewer PushTopicName="Alerts"  
                  MessageFormat="{0} - New Alert created - {1} : {2}" 
                  Messages="[]"
                  FieldsToDisplay="['CreatedDate', 'Name', 'Message__c']" />
</aura:application>