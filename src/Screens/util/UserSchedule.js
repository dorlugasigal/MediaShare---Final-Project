import React from 'react';
const GLOBAL = require('../../Globals.js');
import { Location, Calendar, Permissions } from 'expo';

export default class UserSchedule {

    getCurrentTimeSubject() {

        Permissions.askAsync(Permissions.CALENDAR, Permissions.LOCATION).then((status, permissions) => {
            if (status.status === 'granted')
                Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(calendars => {
                    let selectedCal = calendars.filter(cal => cal.ownerAccount === global.email);
                    Calendar.getEventsAsync([selectedCal[0].id],
                        new Date(),
                        new Date(new Date().setHours(new Date().getHours() + 24)))
                        .then(events => {
                            console.log(events);
                            if (events.length === 0) {
                                Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then(loc => {
                                    Location.reverseGeocodeAsync(loc.coords).then(geocode => {
                                        console.log(geocode);
                                        if (geocode.length === 0) {
                                            alert("Cannot find location")
                                            this.props.navigation.pop();
                                        }
                                        let cur = geocode[0];
                                        fetch(GLOBAL.API + 'AddSubject', {
                                            method: 'POST',
                                            headers: {
                                                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({
                                                'subject': {
                                                    'subjectCreator': global.userID,
                                                    'name': `${cur.street ? cur.street + ',' : ''} ${cur.city ? cur.city + ',' : ''} ${cur.country ? cur.country : ''}`
                                                }
                                            })
                                        }).then((response) =>
                                            response.json()
                                        ).then((responseJson) => {
                                            global.SubjectID = responseJson._id;
                                            console.log(responseJson)
                                        }).catch((error) => {
                                            console.error(error);
                                        });
                                    })
                                })
                            }
                            else {
                                // if there is an event in the current hour,
                                // get its id when it exists, 
                                // or create subject and then get id
                            }
                        })
                }
                )
            else {
                alert("cannot use this module without permissions");
                this.props.navigation.pop();
            };
        });
    }

    getInitEvents() {
        let { startDate, endDate } = this.state;


    }
}