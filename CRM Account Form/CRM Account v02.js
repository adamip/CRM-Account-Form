/*
	Adam Ip																	2011-06-21
	function CurrentResellerMandatory()	
	function Account_OnSave()

*/	
var DebugModeAccountI = false;
/* var DebugModeAccountI2 = true;    use to debug a specific function call  */

/***************************************************************************************/
function CurrentResellerMandatory()
{
	try
	{		
		var ret = false, iRelationshipType = myGetValue( "new_relationshiptype" ), oReseller = myGetValue( "new_currentreseller" );

		if( DebugModeAccountI )
			window.alert( "function CurrentResellerMandatory()\n\tRelationship Type = " + iRelationshipType + "\n\tCurrent Reseller " + oReseller );
		
		/* Label "Relationship Type" is an option set:
			Option: "End User (Channel)", Option value: 279,640,002 */
		switch( iRelationshipType )
		{
			case 279640002:
				if( oReseller == null )
					{
					mySetFocus( "new_currentreseller" );
					window.alert( "\'Current Reseller\' is a mandatory field.\n\nPlease select a value." );
					ret = true;
					}
			default:
				break;
		}	
		return ret;
	}
	catch( err )
	{
		window.alert( "function myGetValue error code " + err );
	}
}

/***************************************************************************************/
function Account_OnSave( executionObj )
{
	try
	{
		if( DebugModeAccountI )
			window.alert( "function Account_OnSave()" );
		if( CurrentResellerMandatory() == true )
			StopFormSaveEvent( executionObj );
	}
	catch( err )
	{
		window.alert( "function Account_OnSave error code " + err );
	}
}

/*** End of lines **********************************************************************/
