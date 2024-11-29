import { FC, lazy, SetStateAction, Suspense, useState } from "react";

const MapComponent = lazy(() => import("./Map"));

// Create a wrapper component that only renders when needed
const LazyMap: FC<{ showModal: boolean; setShowModal: React.Dispatch<SetStateAction<boolean>> }> = ({ showModal, setShowModal }) => {
    const [shouldRender, setShouldRender] = useState(false);

    // Only start rendering after first button click
    if (!shouldRender && showModal) {
        setShouldRender(true);
    }

    if (!shouldRender) {
        return null;
    }

    return (
        <Suspense fallback={
            <div className="w-full h-64 flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">Loading map...</p>
            </div>
        }>
            <MapComponent showModal={showModal} setShowModal={setShowModal} />
        </Suspense>
    );
};
export default LazyMap;