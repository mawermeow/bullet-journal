import classes from "./Intro.module.css";
import PencilAlt from "../icon/PencilAlt";

const Intro = () => {
    return <>
        <div className={classes.intro}>
            <h2>本網站使用方法</h2>
            <div className={classes.content}>
                <ol>
                    <li>先點擊登入，創建帳號並登入。</li>
                    <li>點擊<PencilAlt/>進入日誌頁面，跟著導覽的範例逛逛看。</li>
                    <li>完成後把五則範例都刪掉，然後開始記錄您的子彈筆記吧！</li>
                </ol>

            </div>
        </div>
        <div className={classes.intro}>
            <h2>什麼是子彈筆記？</h2>
            <div className={classes.content}>
                <p>這是一本書名，書中闡述了一種特別簡潔的紙本筆記規則。</p>
                <p>此規則結合了「<b>任務清單、計畫行程表、傳統日記</b>」三要素，將當天每項新任務、事件與關鍵筆記都總結為一句話簡潔描述，再加上重點符號來標示每個任務與事件的性質，並列在筆記中。</p>
                <p>原作中最有意思的概念，是<b>透過跳著頁碼的客製化索引頁，來管理分散在每一天中的專案與大型任務</b>。如此，在未來需要查找時，便能透過這個索引頁輕鬆搞定紙本筆記不便查找的問題。</p>
                <p>這種紀錄方式省時省力，能讓我們在有限的時間中，快速設定並掌握重點項目清單。</p>
                <p>儘管子彈筆記已將手寫的難度壓到最低，但<b>紙質筆記的攜帶依舊是個麻煩</b>，不容易隨時帶在身邊做更新的結果，就是很容易漏東漏西！如果我還要啟用手機裡的APP來做紀錄，那我為何不從一開始就用手機搞定？因此，我一直留心想尋找一個合適的APP來書寫筆記。</p>
                <p>嘗試過許多筆記軟體後，最後讓我定居的是功能簡潔、視覺美觀的熊掌記。我用它做了兩年左右的子彈筆記，最後的結論是：雖然功能很多、還能插入回憶或筆記照片，但熊掌記並不適用於子彈筆記的任務管理與規劃。</p>
                <p>恰逢轉換跑道的期間，我便嘗試自己做了一款網頁小工具，以解決我想好好記錄子彈筆記的需求。你現在正在瀏覽的網站，正是我的成果。</p>
            </div>
        </div>
    </>
};

export default Intro;