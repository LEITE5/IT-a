require('aframe-osm-3d');


window.onload = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('svcw.js').then(registration => {
            console.log('Registered successfully.');
        })
            .catch(e => {
                console.error(`Service worker registration failed: ${e}`);
            });
    } else {
        alert('Sorry, offline functionality not available, please update your browser!');
    }
}

AFRAME.registerComponent('poifinder', {
    schema: {
        objSize: {
            default: 2
        }
    },
    init: function () {
        window.addEventListener('terrarium-start-update', e => {
            document.getElementById("status").innerHTML = "Downloading";
        })
        window.addEventListener('terrarium-dem-loaded', e => {
            document.getElementById("status").innerHTML = "Finished";

        })

        window.addEventListener('gps-camera-update-position', async (e) => {
            this.el.setAttribute('terrarium-dem', {
                lat: e.detail.position.latitude,
                lon: e.detail.position.longitude
            })
        });

        this.el.addEventListener('elevation-available', e => {
            document.querySelector('[gps-projected-camera]').object3D.position.y = e.detail.elevation;
        });

        this.el.addEventListener('osm-data-loaded', e => {
            //RESTAURANT
            e.detail.pois
                .filter(poi => poi.properties.amenity !== undefined && poi.properties.name !== undefined)
                .forEach(poi => {
                    //Making the notice board
                    const infoboard = document.createElement('a-plane');
                    const message = document.createElement('a-text');
                    infoboard.setAttribute('scale', {
                        x: 4,
                        y: 1.5
                    })
                    infoboard.setAttribute('color', "white");

                    infoboard.setAttribute('position', {
                        y: -0.5,
                        z: -1
                    })
                    infoboard.setAttribute('look-at', '[camera]')
                    message.setAttribute('gps-projected-entity-place', {
                        latitude: poi.geometry.coordinates[1],
                        longitude: poi.geometry.coordinates[0]
                    })
                    message.setAttribute('text', {
                        value: `${poi.properties.name}\n${poi.properties.amenity}\n${poi.geometry.coordinates[0]}\n${poi.geometry.coordinates[1]} `,
                        align: "center",
                        baseline: "top",
                        color: "black",
                        wrapCount: 34
                    });
                    message.setAttribute('scale', {
                        x: 2,
                        y: 2,
                        z: 1
                    })
                    message.setAttribute('position', {
                        y: poi.geometry.coordinates[2] + 7
                    })
                    message.setAttribute('look-at', '[camera]')

                    message.appendChild(infoboard);
                    this.el.sceneEl.appendChild(message);

                    if (poi.properties.amenity == "restaurant") {
                        const restEntity = document.createElement('a-entity');
                        restEntity.setAttribute('obj-model', {
                            obj: '#restaurant',
                            mtl: '#restaurant-material'
                        });
                        restEntity.object3D.rotation.y = Math.floor(Math.random() * 181)
                        restEntity.setAttribute('gps-projected-entity-place', {
                            latitude: poi.geometry.coordinates[1],
                            longitude: poi.geometry.coordinates[0]
                        })
                        restEntity.setAttribute('scale', {
                            x: this.data.objSize,
                            y: this.data.objSize,
                            z: this.data.objSize
                        })
                        restEntity.setAttribute('position', {
                            y: poi.geometry.coordinates[2]
                        })

                        restEntity.addEventListener('click', e => {
                            document.getElementById("details").innerHTML = `Name: ${poi.properties.name}<br>`;
                            document.getElementById("details").innerHTML += `Type: ${poi.properties.amenity}<br>`;
                            document.getElementById("details").innerHTML += `Longitude: ${poi.geometry.coordinates[0]}<br>`;
                            document.getElementById("details").innerHTML += `Latitude: ${poi.geometry.coordinates[1]}<br>`;
                            document.getElementById("details").innerHTML += `Altitute: ${poi.geometry.coordinates[2].toFixed(2)}m<br>`;
                            if (poi.properties.website !== undefined) {
                                document.getElementById("details").innerHTML += `Website: ${poi.properties.website}<br>`;
                                if (confirm("You are about to be redirected to the restaurant page, do you want to go?")) {
                                    window.location.href = poi.properties.website
                                }
                                else {
                                    return;
                                }
                            }
                        });
                        this.el.sceneEl.appendChild(restEntity);

                    }
                    else if (poi.properties.amenity == "pub")
                    {
                        const pubEntity = document.createElement('a-entity');
                        pubEntity.setAttribute('obj-model', {
                            obj: '#bottle',
                            mtl: '#bottle-material'
                        });
    
                        pubEntity.setAttribute('gps-projected-entity-place', {
                            latitude: poi.geometry.coordinates[1],
                            longitude: poi.geometry.coordinates[0]
                        })
                        pubEntity.setAttribute('scale', {
                            x: this.data.objSize - 1.5,
                            y: this.data.objSize - 1.5,
                            z: this.data.objSize - 1.5
                        })
                        pubEntity.setAttribute('position', {
                            y: poi.geometry.coordinates[2]
                        })
                        pubEntity.addEventListener('click', e => {
                            document.getElementById("details").innerHTML = `Name: ${poi.properties.name}<br>`;
                            document.getElementById("details").innerHTML += `Type: ${poi.properties.amenity}<br>`;
                            document.getElementById("details").innerHTML += `Longitude: ${poi.geometry.coordinates[0]}<br>`;
                            document.getElementById("details").innerHTML += `Latitude: ${poi.geometry.coordinates[1]}<br>`;
                            document.getElementById("details").innerHTML += `Altitute: ${poi.geometry.coordinates[2].toFixed(2)}m<br>`;
                            if (poi.properties.website !== undefined) {
                                document.getElementById("details").innerHTML += `Website: ${poi.properties.website}<br>`;
                                if (confirm("You are about to be redirected to the pub of interest page, do you want to go?")) {
                                    window.location.href = poi.properties.website
                                }
                                else {
                                    return;
                                }
                            }
                        });
                        this.el.sceneEl.appendChild(pubEntity);
                    }
                    else if (poi.properties.amenity == 'cafe')
                    {
                        const cafeEntity = document.createElement('a-entity');
                    cafeEntity.setAttribute('obj-model', {
                        obj: '#cup',
                        mtl: '#cup-material'
                    });
                    cafeEntity.setAttribute('gps-projected-entity-place', {
                        latitude: poi.geometry.coordinates[1],
                        longitude: poi.geometry.coordinates[0]
                    })
                    cafeEntity.setAttribute('scale', {
                        x: 0.2,
                        y: 0.2,
                        z: 0.2
                    })
                    cafeEntity.setAttribute('position', {
                        y: poi.geometry.coordinates[2]
                    })
                    cafeEntity.addEventListener('click', e => {
                        document.getElementById("details").innerHTML = `Name: ${poi.properties.name}<br>`;
                        document.getElementById("details").innerHTML += `Type: ${poi.properties.amenity}<br>`;
                        document.getElementById("details").innerHTML += `Longitude: ${poi.geometry.coordinates[0]}<br>`;
                        document.getElementById("details").innerHTML += `Latitude: ${poi.geometry.coordinates[1]}<br>`;
                        document.getElementById("details").innerHTML += `Altitute: ${poi.geometry.coordinates[2].toFixed(2)}m<br>`;
                        if (poi.properties.website !== undefined) {
                            document.getElementById("details").innerHTML += `Website: ${poi.properties.website}<br>`;
                            if (confirm("You are about to be redirected to the cafe page, do you want to go?")) {
                                window.location.href = poi.properties.website
                            }
                            else {
                                return;
                            }
                        }
                    });
                    cafeEntity.setAttribute('rotation', {
                        y: Math.floor(Math.random() * 181)
                    });
                    this.el.sceneEl.appendChild(cafeEntity);
                    }
                })

            //LOCATIONS
            e.detail.pois
                .filter(poi => poi.properties.amenity == undefined && poi.properties.name !== undefined)
                .forEach(poi => {
                    const logEntity = document.createElement('a-entity');
                    logEntity.setAttribute('obj-model', {
                        obj: '#tree',
                        mtl: '#tree-material'
                    });
                    logEntity.setAttribute('gps-projected-entity-place', {
                        latitude: poi.geometry.coordinates[1],
                        longitude: poi.geometry.coordinates[0]
                    })
                    logEntity.setAttribute('scale', {
                        x: 40,
                        y: 40,
                        z: 40
                    })
                    logEntity.setAttribute('position', {
                        y: poi.geometry.coordinates[2] + 200
                    })
                    logEntity.addEventListener('click', e => {
                        document.getElementById("details").innerHTML = `Name: ${poi.properties.name}<br>`;
                        document.getElementById("details").innerHTML += `Type: ${poi.properties.amenity}<br>`;
                        document.getElementById("details").innerHTML += `Longitude: ${poi.geometry.coordinates[0]}<br>`;
                        document.getElementById("details").innerHTML += `Latitude: ${poi.geometry.coordinates[1]}<br>`;
                        document.getElementById("details").innerHTML += `Altitute: ${poi.geometry.coordinates[2].toFixed(2)}m<br>`;
                        if (poi.properties.website !== undefined) {
                            document.getElementById("details").innerHTML += `Website: ${poi.properties.website}<br>`;
                            if (confirm("You are about to be redirected to the place of interest page, do you want to go?")) {
                                window.location.href = poi.properties.website
                            }
                            else {
                                return;
                            }
                        }
                    });
                    const entity = document.createElement('a-entity');
                    entity.setAttribute('text', {
                        value: poi.properties.name,
                        align: "center",
                        baseline: "top",
                        color: 'green'
                    });
                    entity.setAttribute('scale', {
                        x: 250,
                        y: 250,
                        z: 250
                    })
                    entity.setAttribute('gps-projected-entity-place', {
                        latitude: poi.geometry.coordinates[1],
                        longitude: poi.geometry.coordinates[0]
                    })
                    entity.setAttribute('position', {
                        y: poi.geometry.coordinates[2] + 150
                    })
                    entity.setAttribute('look-at', '[camera]')
                    this.el.sceneEl.appendChild(logEntity);
                    this.el.sceneEl.appendChild(entity);
                });
        });
    }
});

AFRAME.registerComponent('vertical-controls', {
    init: function () {
        this.velocity = 0;
        window.addEventListener('keydown', e => {
            if (e.keyCode == 81) {
                this.velocity = 3;
            } else if (e.keyCode == 90) {
                this.velocity = -3;
            }
        });
        window.addEventListener('keyup', e => {
            if (e.keyCode == 81 || e.keyCode == 90) {
                this.velocity = 0;
            }
        });
    },

    tick: function (time, delta) {
        const curPos = this.el.getAttribute("position");
        this.el.setAttribute("position", {
            x: curPos.x,
            y: curPos.y + delta * 0.001 * this.velocity,
            z: curPos.z
        });
    }
});