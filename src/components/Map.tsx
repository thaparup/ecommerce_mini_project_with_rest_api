import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DomUtil, LeafletEvent } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import React, { Dispatch, SetStateAction } from "react";

type MapProps = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
};

const Map = ({ showModal, setShowModal }: MapProps) => {
    const modalRef = useRef<HTMLDivElement>(null)

    const eventHandlers = useMemo(
        () => ({
            drag(event: LeafletEvent) {
                const successCallback = (position) => {
                    console.log(position);
                };

                const errorCallback = (error) => {
                    console.log(error);
                };

                navigator.geolocation.getCurrentPosition(
                    successCallback,
                    errorCallback
                );
            },
        }),
        []
    );

    useEffect(() => {
        if (showModal) {
            document.body.style.background = "rgb(38 38 38 / 0.5)";
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.background = "#d6d3d1";
            document.body.style.overflow = "scroll";
        }
    }, [showModal]);

    useEffect(() => {
        const mouseDownHandler = (event: MouseEvent) => {



            if (
                modalRef.current && !modalRef.current.contains(event.target as Node)
            ) {
                setShowModal(false)
            }
        }

        if (modalRef.current) {

            document.addEventListener('mousedown', mouseDownHandler)
        }
    },)
    return (
        <>
            <div
                className={` fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 ease-in-out ${showModal ? " translate-y-0" : " -translate-y-[44rem] "
                    }`}
            >
                <div
                    className={`bg-white rounded-md  w-[70%] h-[90%] p-16 relative flex  }`}
                    ref={modalRef}

                >
                    <MapContainer
                        center={[51.505, -0.09]}
                        zoom={27}
                        scrollWheelZoom={false}
                        className="w-full h-full"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            position={[51.505, -0.09]}
                            draggable={true}
                            eventHandlers={eventHandlers}
                        >
                            <Popup>I live here</Popup>
                        </Marker>
                    </MapContainer>
                    <button
                        className="absolute p-2 rounded-[100%] top-2 left-2 hover:bg-[#dddddd]"
                        onClick={() => setShowModal(false)}
                    >
                        <LiaTimesSolid size={18} className="" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Map;
