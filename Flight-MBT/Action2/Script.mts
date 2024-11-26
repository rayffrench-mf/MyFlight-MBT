' Book a flight according to the passed in 7 parameters 
'This action must start on the post-login screen that shows BOOK FLIGHT and SEARCH ORDER.
' IMPORTANT - must edit BookFlight properties parameters OrderDate to be in the future

a=Parameter("FlyFrom")
b=Parameter("FlyTo")
c=Parameter("OrderDate") ' must use format 19-Dec-2023 and ALWAYS must be in the future - see Action Call Properties
d=Parameter("ClassOfService")
e=Parameter("Tickets")
f=Parameter("PassengerName")
g=Parameter("SelectedRow")

' If we're not on the BOOK FLIGHT screen then exit
If WpfWindow("OpenText MyFlight Sample").WpfTabStrip("WpfTabStrip").Exist Then
	WpfWindow("OpenText MyFlight Sample").WpfTabStrip("WpfTabStrip").Select "BOOK FLIGHT"
Else
	Reporter.ReportEvent micFail, "Book Flight - Wrong screen", "Not on BOOK FLIGHT screen. Exiting..."
	ExitAction
End If

WpfWindow("OpenText MyFlight Sample").WpfComboBox("fromCity").Select a @@ hightlight id_;_2135054328_;_script infofile_;_ZIP::ssf4.xml_;_
WpfWindow("OpenText MyFlight Sample").WpfComboBox("toCity").Select b @@ hightlight id_;_1948026184_;_script infofile_;_ZIP::ssf8.xml_;_
WpfWindow("OpenText MyFlight Sample").WpfCalendar("datePicker").SetDate c @@ hightlight id_;_2135059656_;_script infofile_;_ZIP::ssf10.xml_;_
WpfWindow("OpenText MyFlight Sample").WpfComboBox("Class").Select d
WpfWindow("OpenText MyFlight Sample").WpfComboBox("numOfTickets").Select e
WpfWindow("OpenText MyFlight Sample").WpfButton("FIND FLIGHTS").Click
WpfWindow("OpenText MyFlight Sample").WpfTable("flightsDataGrid").SelectRow g
WpfWindow("OpenText MyFlight Sample").WpfButton("SELECT FLIGHT").Click
WpfWindow("OpenText MyFlight Sample").WpfEdit("passengerName").Set f
WpfWindow("OpenText MyFlight Sample").WpfButton("ORDER").Click

Wait 2 ' The Exist statement below seems to find a little box that exists if we run too fast - so the Wait is necessary
'Wait for Completed message to appear (about 3-4 seconds)
If WpfWindow("OpenText MyFlight Sample").WpfObject("OrderCompletedMessage").Exist (4) Then
	WpfWindow("OpenText MyFlight Sample").WpfObject("OrderCompletedMessage").Output CheckPoint("OrderCompletedNumber") @@ hightlight id_;_1929008192_;_script infofile_;_ZIP::ssf20.xml_;_
End  If

Parameter("PassengerNameOut") = f
Parameter("OrderDateOut") = c

' Flight app ends on ORDER DETAILS screen with order number showing and NEW SEARCH button available

