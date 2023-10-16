const WorkshopsList = ({day, price, workshop}) => {

    const DateFormat = (date) => {
        if(date === 1){
            day = 'One';
        } else if(date === 2){
            day = 'Two';
        }else if(date === 3){
            day = 'Three';
        }
        return day;
    }

    return (
        <>
        <h2>Day {DateFormat(day)}</h2>
    <p>Price: {price}$</p>
    <p>Workshops: {workshop.name}</p>
    </>
    )
};

export default WorkshopsList;