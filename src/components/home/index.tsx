"use client";

import React, { FormEvent, useState } from "react";
import styles from "./style.module.css";
import { useMemoizedFn } from "ahooks";
import Logo from "../logo";
import { Footer } from "../footer";
import { API_PREFIX, EMAIL, TEL } from "@/utils/const";
import { isInput, isTextarea } from "@/utils/is";
import axios from "axios";
import Dialog from "rc-dialog";

import "rc-dialog/assets/index.css";

const TABS = ["BUSINESS", "COMPANY", "CONTACT"];
const HeadHeight = 80;

export default function Home(props: {
  content: Record<string, React.ReactNode>;
}) {
  const [error, setError] = useState({ name: "", email: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [visible, setVisible] = useState(false);

  const onTop = useMemoizedFn(() => {
    document.body.scrollTo({ top: 0, behavior: "smooth" });
  });

  const toTab = useMemoizedFn((tab: string) => {
    const title = document.querySelector(
      `[data-title="${tab}"]`
    ) as HTMLTitleElement;
    if (title) {
      const top = title.offsetTop;
      document.body.scrollTo({ top: top - HeadHeight, behavior: "smooth" });
    }
  });

  const gotoKnowhow = useMemoizedFn(() => {
    window.open("https://know-how.everacel.com");
  });

  const resetError = useMemoizedFn(() => {
    setError({ name: "", email: "", content: "" });
    setSubmitError("");
  });

  const submit = useMemoizedFn(async (params: any) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_PREFIX}/api/v1/contact/submit`,
        params
      );
      if (res.data === "success") {
        setVisible(true);
      }
    } catch (error: any) {
      setSubmitError(error.message);
    } finally {
      setLoading(false);
    }
  });

  const onSubmit = useMemoizedFn((e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    const target = e.target as HTMLFormElement;

    const params: Record<string, string> = {};

    for (let i = 0; i < target.length; i++) {
      const dom = target[i] as HTMLElement;
      if (isInput(dom)) {
        params[dom.name] = dom.value.trim();
      } else if (isTextarea(dom)) {
        params[dom.name] = dom.value.trim();
      }
    }

    // check
    if (!params.name) {
      setError((old) => {
        return { ...old, name: "は必須項目です。" };
      });
    }
    if (!params.email) {
      setError((old) => {
        return { ...old, email: "は必須項目です。" };
      });
    }
    if (!params.content) {
      setError((old) => {
        return { ...old, content: "は必須項目です。" };
      });
    }
    if (params.name && params.email) {
      submit(params);
    }
  });

  const onChange = useMemoizedFn(() => {
    resetError();
  });

  return (
    <div className={styles.home}>
      <div className={styles.head} style={{ height: HeadHeight }}>
        <div className={styles["header-main"]}>
          <div className={styles.headers}>
            <div className={styles.title}>
              <Logo size={40} />
              <h2>EVERACEL</h2>
            </div>
            <div className={styles.menus}>
              <div className={styles.menu} onClick={gotoKnowhow}>
                KNOW-HOW
              </div>
              <div className={styles.menu} onClick={onTop}>
                TOP
              </div>
              {TABS.map((tab) => {
                return (
                  <div
                    key={tab}
                    className={styles.menu}
                    onClick={() => toTab(tab)}
                  >
                    {tab}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles["body-main"]}>
          <section>
            <img alt="" src="/image/bg.png" />
          </section>

          <section>
            <h4 data-title="BUSINESS">BUSINESS</h4>
            <div className={styles["sec-title"]}>
              <Logo></Logo>
              <h3>中国調達時強力なサポート</h3>
            </div>
            <hr className={styles.hr} />
            <h4>輸送代行</h4>
            <hr className={styles.hr} />
            <div className={styles["biz-section"]}>
              {/* <div className={styles["biz-title"]}>輸送代行</div> */}
              <div>
                <p
                  className={styles["with-title"]}
                  data-title="航空便 Air Cargo"
                >
                  ドアツードアのクーリエサービスにより、中国から日本への直接配達サービスを提供します。
                </p>
                <br />
                <p className={styles["with-title"]} data-title="船便 Sea Cargo">
                  ドアツードアの船便サービスを提供します。荷物の受託から、船ブッキング・通関・配送まで、全てのプロセスを対応します。
                </p>
                <br />
                <p
                  className={styles["with-title"]}
                  data-title="フォワーダーサービス Forwarder Service"
                >
                  航空と海上の両方をカバーする多様なサービスから、お客様に最適な輸送プランを提供します。
                </p>
              </div>
            </div>

            <table className={styles["biz-table"]}>
              <thead>
                <tr>
                  <td colSpan={2}>国際海上輸送サービス</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>FCLサービス</td>
                  <td>ドアツードアのフルコンテナ輸送を提供します。</td>
                </tr>
                <tr>
                  <td>LCLサービス</td>
                  <td>小口混載輸送の貨物を配送します。</td>
                </tr>
                <tr>
                  <td>特殊コンテナサービス</td>
                  <td>
                    通常のコンテナだけでなく、特殊コンテナ・在来船サービスも提供します。
                  </td>
                </tr>
                <tr>
                  <td>危険品輸送</td>
                  <td>
                    危険品・化学品の梱包・保管・国際輸送の一貫手配を提供します。
                  </td>
                </tr>
              </tbody>
            </table>

            <table className={styles["biz-table"]}>
              <thead>
                <tr>
                  <td colSpan={2}>国際航空輸送サービス</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>危険物輸送</td>
                  <td>安全を確保した輸送サービスを提供します。</td>
                </tr>
                <tr>
                  <td>保冷品輸送</td>
                  <td>
                    温度管理が必要な多様な商材に対応します。保冷剤の梱包も可能です。
                  </td>
                </tr>
                <tr>
                  <td>食品輸送</td>
                  <td>
                    温度管理が必要な生鮮食品サービス、輸出入規制・動植物検疫をサポートします。
                  </td>
                </tr>
              </tbody>
            </table>

            <table className={styles["biz-table"]}>
              <thead>
                <tr>
                  <td colSpan={2}>輸送以外のサービス</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>輸出梱包</td>
                  <td>
                    小物から大型まで、貨物仕様に合わせた輸出梱包サービスを提供します。
                  </td>
                </tr>
                <tr>
                  <td>設備輸送</td>
                  <td>
                    搬出～梱包～通関～船積み～国際輸送～現地搬入までを一貫手配します。
                  </td>
                </tr>
                <tr>
                  <td>荷主代行サービス</td>
                  <td>
                    輸出業務、輸入業務（輸出入船積み手続き、船積み書類作成など）を代行します。
                  </td>
                </tr>
              </tbody>
            </table>

            <div className={styles["img-section"]}>
              <h5>輸出入取扱サービスのながれ</h5>
              <img
                src="/image/forwarding_img07.svg"
                alt="輸出入取扱サービスのながれ"
              />
            </div>
            <div className={styles["img-section"]}>
              <h5>輸出入取扱サービス概要</h5>
              <img
                src="/image/forwarding_img06.svg"
                alt="輸出入取扱サービス概要"
              />
            </div>

            <hr className={styles.hr} style={{ marginTop: 24 }} />
            <h4>調達代行</h4>
            <hr className={styles.hr} />
            <div className={styles["biz-section"]}>
              <div>
                <p
                  className={styles["with-title"]}
                  data-title="OEM ( Original Equipment Manufacturer ) サポート"
                >
                  自社ブランドや独自デザイン商品の特別発注、生産、国際輸送に関する一貫した代行サービスを提供いたします。
                </p>
              </div>
            </div>
            <table className={styles["biz-table"]}>
              <thead>
                <tr>
                  <td colSpan={2}>OEMサポート詳細</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>商品リサーチ</td>
                  <td>
                    アリババやタオバオにて商品の価格帯、素材、納期、販売状況を調査し、提携工場とのコミュニケーションを通じて必要情報を収集します。
                  </td>
                </tr>
                <tr>
                  <td>部品サプライヤーリサーチ</td>
                  <td>
                    開発予定商品のパッケージ、タグ、付属品などの単独サプライヤー調査と仕入れ価格の交渉を行います。
                  </td>
                </tr>
                <tr>
                  <td>生産工場のリサーチ＆選定</td>
                  <td>
                    部品のサプライヤー選定後、製造工場を調査し、納期、価格、MOQ情報を基に最終工場を選びます。
                  </td>
                </tr>
                <tr>
                  <td>サンプル加工交渉＆フォローアップ</td>
                  <td>
                    サンプル品作成に向けての部品サプライヤーと工場との交渉・調整が重要なため、少量部品の購入と生産を交渉、実行し、完成までフォローアップします。
                  </td>
                </tr>
                <tr>
                  <td>部品、および製造価格の交渉</td>
                  <td>
                    サンプル確認後、初回オーダー数量と納期を見直し、最終見積もりまで調整や交渉を行います。
                  </td>
                </tr>
                <tr>
                  <td>大量生産開始（正式発注）</td>
                  <td>
                    正式発注が行われたら、発注代行などの手続きを行います。
                  </td>
                </tr>
                <tr>
                  <td>生産開始後のフォローアップ＆納期確認</td>
                  <td>
                    生産開始後は進捗状況の確認とフォローアップを継続的に行います。問題が発生した場合は、即座に交渉や介入を行います。
                  </td>
                </tr>
                <tr>
                  <td>生産済み製品の国内・国際輸送手配</td>
                  <td>
                    完成した製品の工場からお客様までの輸送と通関書類作成などを一手に引き受けます。
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h4 data-title="COMPANY">COMPANY</h4>
            <div className={styles["sec-title"]}>
              <Logo></Logo>
              <h3>企業理念</h3>
            </div>
            <div>
              <hr />
              <p>お客様中心、一歩先を行くサプライチェーンソリューション</p>
              <hr />
              <p>
                我々は、お客様へのサービスを心から大切にし、国際的な貨物輸送代行とサプライチェーン解決策を提供します。このサービスは、お客様のニーズに深く対応し、コスト効率と信頼性を最大化することを目指しています。私たちの使命は、お客様のビジネスの成功をサポートすることであり、それを通じて私たちの成長と繁栄を追求します。これは我々の企業理念に深く根ざしています。
              </p>
              <hr />
            </div>

            <div className={styles["sec-title"]}>
              <Logo></Logo>
              <h3>企業概要</h3>
            </div>
            <div className={styles["sec-padding"]}>
              <div className={styles.grid}>
                <div>会社名</div>
                <div>Everacel Co., Ltd.</div>
              </div>
              <div className={styles.grid}>
                <div>所在地</div>
                <div>
                  〒518-000
                  <br />
                  中国広東省深セン市南山区南山通り荔湾コミュニティ前海路70号
                </div>
              </div>
              <div className={styles.grid}>
                <div>連絡先</div>
                <div>
                  <div>
                    TEL: <a href={`tel:${TEL}`}>{TEL}</a>
                  </div>
                  <div>
                    Email: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                  <div>
                    Website:{" "}
                    <a href="https://www.everacel.com">www.everacel.com</a>
                  </div>
                </div>
              </div>
              <div className={styles.grid}>
                <div>事業内容</div>
                <div>日中物流サービス、サプライヤーチェーンサポート</div>
              </div>
            </div>
          </section>

          <section>
            <h4 data-title="CONTACT">CONTACT</h4>
            <div className={styles["sec-title"]}>
              <Logo></Logo>
              <h3>Everacel Co., Ltd.</h3>
            </div>
            <div>
              <p>
                E-mail: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
              <p>
                Phone: <a href={`tel:${TEL}`}>{TEL}</a>
              </p>
              <p>Wechat: {TEL}</p>
              <p>Whatsapp: {TEL}</p>
            </div>

            <div className={styles["sec-title"]}>
              <Logo></Logo>
              <h3>お問い合わせフォーム</h3>
            </div>

            <div>
              <form
                method="post"
                id="form"
                onSubmit={onSubmit}
                onChange={onChange}
              >
                <div className={styles["form-grid"]}>
                  <div>お名前 *</div>
                  <div>
                    <input type="text" name="name" maxLength={100} />
                  </div>
                  <div className={styles.error}>{error?.name ?? ""}</div>
                </div>
                <div className={styles["form-grid"]}>
                  <div>メールアドレス *</div>
                  <div>
                    <input type="text" name="email" maxLength={100} />
                  </div>
                  <div className={styles.error}>{error?.email ?? ""}</div>
                </div>
                <div className={styles["form-grid"]}>
                  <div>連絡先電話番号</div>
                  <div>
                    <input type="text" name="phone" maxLength={100} />
                  </div>
                  <div></div>
                </div>
                <div className={styles["form-grid"]}>
                  <div>主题</div>
                  <div>
                    <input type="text" name="subject" maxLength={100} />
                  </div>
                  <div></div>
                </div>
                <div className={styles["form-grid"]}>
                  <div>内容 *</div>
                  <div>
                    <textarea rows={8} name="content" maxLength={800} />
                  </div>
                  <div className={styles.error}>{error?.content ?? ""}</div>
                </div>
                <div className={styles["form-grid"]}>
                  <div></div>
                  <div>
                    <button className={styles.submit} type="submit" id="submit">
                      送信
                    </button>
                  </div>
                  <div></div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
      <Footer />

      <Dialog
        title={null}
        visible={visible}
        width={400}
        onClose={() => {
          setVisible(false);
          location.reload();
        }}
      >
        <p style={{ paddingTop: 20 }}>
          送信いただきありがとうございます。私たちは出来るだけ早くご連絡いたします。電話とメールのチェックをお願いいたします。
        </p>
      </Dialog>
    </div>
  );
}
