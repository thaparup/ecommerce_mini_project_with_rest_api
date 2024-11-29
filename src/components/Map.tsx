import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import React, { Dispatch, SetStateAction } from "react";
import useFetch from "../hooks/useFetch";
import { LeafletEvent, LeafletEventHandlerFnMap } from "leaflet";

type MapProps = {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
    address: string;
    setAddress: Dispatch<SetStateAction<string>>;
};



const Map = ({ showModal, setShowModal, address, setAddress }: MapProps) => {


    const [position, setPosition] = useState({ lat: 27.7103, lng: 85.3222 });
    const modalRef = useRef<HTMLDivElement>(null);


    const eventHandlers: LeafletEventHandlerFnMap = {

        dragend: (event: LeafletEvent) => {

            callApi(event.target._latlng.lat, event.target._latlng.lng)
        }

    }






    const callApi = async (lat: number, lng: number) => {
        try {

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const responseData = await response.json()
            setAddress(responseData.display_name)
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

        } catch (err) {
            if (err instanceof Error) {
            }
        } finally {
        }
    };

    useEffect(() => {

        // const success = (result: GeolocationPosition) => {
        //     setPosition({ lat: result.coords.latitude, lng: result.coords.longitude });
        //     console.log(position)
        // };

        // const error = (err: GeolocationPositionError) => {
        //     console.error(err);
        // };

        // navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true });

        if (showModal) {
            // document.body.style.background = "rgb(38 38 38 / 0.5)";
            // document.body.style.overflowY = "hidden";

        } else {
            // document.body.style.background = "#d6d3d1";
            // document.body.style.overflowY = 'scroll'
        }
    }, [showModal]);

    useEffect(() => {
        const mouseDownHandler = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setShowModal(false);
            }
        };

        document.addEventListener("mousedown", mouseDownHandler);
        return () => {
            document.removeEventListener("mousedown", mouseDownHandler);
        };
    }, [setShowModal]);


    return (
        <>
            <div
                className={` fixed inset-0 z-50 flex justify-center items-center transition-all duration-500 ease-in-out ${showModal ? " opacity-100 translate-y-0" : "opacity-0 -translate-y-[44rem]"
                    }`}
            >
                <div className="bg-white rounded-md w-[70%] h-[90%] p-16 relative flex" ref={modalRef}>
                    <MapContainer
                        center={position}
                        zoom={27}
                        scrollWheelZoom={false}
                        className="w-full h-full  bg-red-200"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position} draggable eventHandlers={eventHandlers}>
                            <Popup>I live here</Popup>
                        </Marker>
                        {/* <RecenterMap position={position} /> */}
                    </MapContainer>
                    <button
                        className="absolute p-2 rounded-[100%] top-2 left-2 hover:bg-[#dddddd]"
                        onClick={() => setShowModal(false)}
                    >
                        <LiaTimesSolid size={18} />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Map;
