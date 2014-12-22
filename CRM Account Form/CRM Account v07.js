/*
	Adam Ip																	2011-06-21
	function CurrentResellerMandatory()	
	function Account_OnSave()

	Adam Ip																	2014-07-31
	function Account_OnLoad()
	function EnableG3()

	Adam Ip																	2014-08-29
	function CallCenter_Change()
	function SetCallCenter()
	
	Adam Ip																	2014-10-24
	function VerintCallCenter_Change()
	function AvayaCallCenter_Change()

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
		window.alert( "function myGetValue()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/***************************************************************************************/
function EnableG3()
{
	try
	{
		if( DebugModeAccountI ) window.alert( "function EnableG3()" );
		if( IsAuthorizedForTeams( ['G3 Account Status - RW'] ) == true )
			{
			mySetVisible( "new_g3_status", true );			
			mySetDisabled( "new_g3_status", false );
			}
		else if( IsAuthorizedForTeams( ['G3 Account Status - R'] ) == true )
			{		
			mySetVisible( "new_g3_status", true );			
			mySetDisabled( "new_g3_status", true );
			}
		else	
			{
			mySetVisible( "new_g3_status", false );			
			mySetDisabled( "new_g3_status", true );
			}		
	}
	catch( err )
	{
		window.alert( "function EnableG3()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/***************************************************************************************/
function SetCallCenter()
{
	try
	{
		if( DebugModeAccountI ) window.alert( "function SetCallCenter()" );
		var v = myGetValue( "cust_segmentcallcenter" );
		var a = myGetValue( "new_avaya" );
		if( v || a )
		{
			myForceSubmitSetValue( "new_callcenter", 1 );
			mySetVisible( "new_isvhardware", true );
		}	/*
		else	
		{
			myForceSubmitSetValue( "new_callcenter", 0 );
			mySetVisible( "new_isvhardware", false );
		}  */
	}
	catch( err )
	{
		window.alert( "function SetCallCenter()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/***************************************************************************************/
function VerintCallCenter_Change()
{
	try
	{
		if( DebugModeAccountI ) window.alert( "function VerintCallCenter_Change()" );
		SetCallCenter();
	}
	catch( err )
	{
		window.alert( "function VerintCallCenter_Change()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/***************************************************************************************/
function AvayaCallCenter_Change()
{
	try
	{
		if( DebugModeAccountI ) window.alert( "function AvayaCallCenter_Change()" );
		SetCallCenter();
	}
	catch( err )
	{
		window.alert( "function AvayaCallCenter_Change()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/***************************************************************************************/
function CallCenter_Change()
{
	try
	{
		if( DebugModeAccountI ) window.alert( "function CallCenter_Change()" );
		if( myGetValue( "new_callcenter" ) == 0 )
		{
			mySetValue( "cust_segmentcallcenter", 0 );
			mySetValue( "new_avaya", 0 );
		}
	}
	catch( err )
	{
		window.alert( "function CallCenter_Change()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/**************************************************************************************
	Entry Point
*/
function Account_OnLoad()
{
	try
	{
		DebugModeAccountI = DebugModeAccountI && AmISoftwareDeveloper();
		if( DebugModeAccountI ) window.alert( "function Account_OnLoad()" );
		EnableG3(); 
		SetCallCenter();	
	}
	catch( err )
	{
		window.alert( "function Account_OnLoad()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/***************************************************************************************/
function Account_OnSave( executionObj )
{
	try
	{
		if( DebugModeAccountI ) window.alert( "function Account_OnSave()" );
		if( CurrentResellerMandatory() == true )
			StopFormSaveEvent( executionObj );
		CallCenter_Change();	
	}
	catch( err )
	{
		window.alert( "function Account_OnSave()\nerr code\t" + err + "\nerr name\t" + err.name + "\nerr message\t" + err.message + "\nerr number\t" + err.number + "\nerr prototype\t" + err.prototype  + "\nerr toString\t" + err.toString());
	}
}

/*** End of lines **********************************************************************/
