import {getSession} from "next-auth/client";

const DailyLogPage = (props) => {
    return <div className='center'>
        <input type="text"/>
        <div>事件｜任務｜註解</div>
        <p>點了就會新增今天這個時間的項目，一直往下加</p>
        <hr/>
        <ul>
            <li>任務：-</li>
            <li>註解 > </li>
        </ul>
    </div>
};

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {session},
    };
}

export default DailyLogPage;