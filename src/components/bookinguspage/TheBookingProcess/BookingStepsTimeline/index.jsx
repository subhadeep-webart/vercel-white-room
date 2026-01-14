import 'react-vertical-timeline-component/style.min.css';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';

const BookingStepsTimeline = ({ bookingProcess }) => {
    return (
        <VerticalTimeline lineColor="#2A2E38" layout="1-column-left">
            {bookingProcess?.map((step, index) => (
                <VerticalTimelineElement
                    key={index}
                    contentStyle={{
                        background: '#1B1E25',
                        color: '#fff',
                    }}
                    contentArrowStyle={{
                        borderRight: '7px solid #1B1E25',
                    }}
                    iconStyle={{
                        background: '#ED7EEE',
                        color: '#1B1E25',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        boxShadow: '0 0 0 4px #1B1E25',
                    }}
                    icon={<span>{index + 1}</span>}
                >
                    <p className="text-[#8F8F8F] text-sm sm:text-base leading-relaxed">
                        {step}
                    </p>
                </VerticalTimelineElement>
            ))}
        </VerticalTimeline>
    );
};

export default BookingStepsTimeline;
