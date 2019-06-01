import React from 'react';
import { Button, View, Text, Alert, StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars';
import { Calendar, Permissions } from 'expo';


class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      initItems: {},
      startDate: (new Date()).setMonth(new Date().getMonth() - 3),
      endDate: (new Date()).setMonth(new Date().getMonth() + 3),
    };
  }

  componentDidMount() {
    this.getInitEvents();
  }

  render() {
    return (
      <Agenda
        items={this.state.initItems}
        //loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        minDate={this.state.startDate}
        maxDate={this.state.endDate}
      />
    );
  }

  getInitEvents() {
    let { startDate, endDate } = this.state;

    Permissions.askAsync(Permissions.CALENDAR).then((status, permissions) => {
      if (status.status === 'granted')
        Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(calendars => {
          let selectedCal = calendars.filter(cal => cal.ownerAccount === global.email);
          Calendar.getEventsAsync([selectedCal[0].id], startDate, endDate).then(events => {
            newEvents = {};
            events.forEach(x => {
              newEvents[x["startDate"].substring(0, 10)] = (events.filter(ev => x["startDate"].substring(0, 10) === ev["startDate"].substring(0, 10)));
            })
            let arrayOfDates = this.getDates(startDate, endDate);
            arrayOfDates.forEach(dat => {
              if (!newEvents.hasOwnProperty(dat.toISOString().substring(0, 10))) {
                newEvents[dat.toISOString().substring(0, 10)] = [];
              }
            })
            this.setState({
              initItems: newEvents
            });
          })
        });
    });
  }

  addDays = function (day, days) {
    var date = new Date(day);
    date.setDate(date.getDate() + days);
    return date;
  }

  getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate));
      currentDate = this.addDays(currentDate, 1);
    }
    return dateArray;
  }

  getEventsForDay(events, x) {
    return;
  }

  renderItem(item) {
    return (
      <View style={[styles.item]}>
        <Text>{item.title}</Text>
        <Text>{item.location}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No tasks for this day</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    height: 100
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});
export default ScheduleScreen