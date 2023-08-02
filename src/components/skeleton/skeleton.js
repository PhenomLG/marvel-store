import "./skeleton.scss";

const Skeleton = () => {
    return (
        <>
            <div className="skeleton__title">Please select a character to see information</div>
            <div className="skeleton__first">
                <div className="skeleton__circle"></div>
                <div className="skeleton__rectangle_little"></div>
            </div>
            <div className="skeleton__rectangle"></div>
            <div className="skeleton__rectangle"></div>
            <div className="skeleton__rectangle"></div>
        </>
    )
}

export default Skeleton;