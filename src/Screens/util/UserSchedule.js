import React from 'react';
const GLOBAL = require('../../Globals.js');
import { Location, Calendar, Permissions } from 'expo';

export default class UserSchedule {
    getSubjectLoction(){
        Location.getCurrentPositionAsync({ enableHighAccuracy: true }).then(loc => {
            Location.reverseGeocodeAsync(loc.coords).then(geocode => {
                // console.log(geocode);
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
                            'name': `${cur.street ? cur.street + ', ' : ''}${cur.city ? cur.city + ', ' : ''}${cur.country ? cur.country : ''}`
                        }
                    })
                }).then((response) =>
                    response.json()
                ).then((responseJson) => {
                    global.SubjectID = responseJson._id;
                }).catch((error) => {
                    console.error(error);
                });
            })
        })
    }
    getCurrentTimeSubject() {

        Permissions.askAsync(Permissions.CALENDAR, Permissions.LOCATION).then((status, permissions) => {
            if (status.status === 'granted')
                Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT).then(calendars => {
                    let selectedCal = calendars.filter(cal => cal.ownerAccount === global.email);
                    Calendar.getEventsAsync([selectedCal[0].id],
                        new Date().setHours(0, 0, 0, 0),
                        new Date(new Date().setHours(new Date().getHours() + 24)).setHours(0, 0, 0, 0))
                        .then(events => {
                            // console.log(events);
                            if (events.length === 0) {
                                this.getSubjectLoction();
                            }
                            else {
                                let now = new Date()
                                let filteredEvent = events.filter(x => new Date(x.startDate) <= now && new Date(x.endDate) >= now)
                                if (filteredEvent.length > 0) {
                                    let currentEvent = filteredEvent[0]
                                    fetch(GLOBAL.API + 'AddSubject', {
                                        method: 'POST',
                                        headers: {
                                            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({
                                            'subject': {
                                                'subjectCreator': global.userID,
                                                'name': currentEvent.title,
                                            }
                                        })
                                    }).then((response) =>
                                        response.json()
                                    ).then((responseJson) => {
                                        global.SubjectID = responseJson._id;
                                        // console.log(responseJson)
                                    }).catch((error) => {
                                        console.error(error);
                                    });
                                }
                                else {
                                    this.getSubjectLoction();
                                }
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