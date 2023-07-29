
const Spinner = () => {
    return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{margin: '0 auto', background: 'none', display: 'block', shapeRendering: 'auto'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <path d="M25 50A25 25 0 0 0 75 50A25 27.3 0 0 1 25 50" fill="#9f0013" stroke="none">
            <animateTransform attributeName="transform" type="rotate" dur="0.9900990099009901s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51.15;360 50 51.15"></animateTransform>
        </path>
    </svg>  
    )
}

export default Spinner;