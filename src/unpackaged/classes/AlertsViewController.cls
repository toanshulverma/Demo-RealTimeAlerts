public class AlertsViewController {
    @AuraEnabled
    public static string getSessionID(){
		return UserInfo.getSessionId().right(UserInfo.getSessionId().length() - 3);
    }
}