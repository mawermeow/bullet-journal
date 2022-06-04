import {getSession} from "next-auth/client";

const MonthlyLogPage = (props) => {
    return <>
        <h1>新增事件任務</h1>
        <h1>顯示{props.yearly}年{props.monthly}月未安排之任務</h1>
        <h1>事件任務列表</h1>
    </>
};

export async function getServerSideProps(context) {
    const session = await getSession({req: context.req});
    const {params} = context;
    const yearly = params.yearly;
    const monthly = params.monthly;

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }
    return {
        props: {session, yearly, monthly},
    };
}

export default MonthlyLogPage;