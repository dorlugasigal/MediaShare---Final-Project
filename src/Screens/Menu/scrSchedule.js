import React from 'react';
import { Button, View, Text, Alert, StyleSheet } from 'react-native'
import { Agenda } from 'react-native-calendars';
import { Calendar, Permissions } from 'expo';


class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      startDate: (new Date()).setMonth(new Date().getMonth() - 3),
      endDate: (new Date()).setMonth(new Date().getMonth() + 3),
    };
  }

  componentDidMount() {
    // const { startDate, endDate } = this.state;
    // Permissions.askAsync(Permissions.CALENDAR).then((status, permissions) => {
    //   if (status.status === 'granted')
    //     Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(calendars => {
    //       let selectedCal = calendars.filter(cal => cal.ownerAccount === global.email);
    //       Calendar.getEventsAsync([selectedCal[0].id], startDate, endDate).then(events => {
    //         console.log(events);
    //         //   const newItems = {}
    //         //   Object.keys(events).forEach(key => { newItems[key] = events[key]; });
    //         //   this.setState({
    //         //     items: newItems
    //         //   });
    //       })
    //     });
    // });
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      // for (let i = -15; i < 85; i++) {
      //   const time = day.timestamp + i * 24 * 60 * 60 * 1000;
      //   const strTime = this.timeToString(time);
      //   if (!this.state.items[strTime]) {
      //     this.state.items[strTime] = [];
      //     const numItems = Math.floor(Math.random() * 5);
      //     for (let j = 0; j < numItems; j++) {
      //       this.state.items[strTime].push({
      //         name: 'Item for ' + strTime,
      //         height: Math.max(50, Math.floor(Math.random() * 150))
      //       });
      //     }
      //   }
      // }
      // //console.log(this.state.items);
      // const newItems = {};
      // Object.keys(this.state.items).forEach(key => { newItems[key] = this.state.items[key]; });
      // this.setState({
      //   items: newItems
      // });
      // console.log(newItems);
      // }, 1000);
      // console.log(`Load Items for ${day.year}-${day.month}`);

      const { startDate, endDate } = this.state;
      Permissions.askAsync(Permissions.CALENDAR).then((status, permissions) => {
        if (status.status === 'granted')
          Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(calendars => {
            let selectedCal = calendars.filter(cal => cal.ownerAccount === global.email);
            Calendar.getEventsAsync([selectedCal[0].id], startDate, endDate).then(events => {
              newEvents = {};
              events.forEach(x => {
                newEvents[x["startDate"].substring(0, 10)] = (events.filter(ev => x["startDate"].substring(0, 10) === ev["startDate"].substring(0, 10)))
              })
              console.log(newEvents);
              this.setState({
                items: newEvents
              });
            })
          });
      });
    });
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
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
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