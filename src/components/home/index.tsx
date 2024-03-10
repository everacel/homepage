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
  const [error, setError] = useState({ name: "", email: "" });
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

  const resetError = useMemoizedFn(() => {
    setError({ name: "", email: "" });
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
            <div className={styles["biz-section"]}>
              <div className={styles["biz-title"]}>輸送代行</div>
              <div>
                <p>
                  空輸、海輸などのドアツードアの物流サービスプランを提供します。
                </p>
                <p>物流のコストを下げて効率を上げることを求めます。</p>
                <p>サービスの質が高く、手間がかからないことを追求します。</p>
              </div>
            </div>

            <div className={styles["biz-section"]}>
              <div className={styles["biz-title"]}>調達代行</div>
              <div>
                <p>
                  調達の要求に応じて、全供給チェーンの追跡サービスを提供します。
                </p>
                <p>
                  新製品の開発、工場の探しと考察、試作品の提供、大量生産の追跡、注文の納品まで。
                </p>
              </div>
            </div>
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
              <h3>Find Everacel Co., Ltd.</h3>
            </div>
            <div>
              <p>
                電話: <a href={`tel:${TEL}`}>{TEL}</a>
              </p>
              <p>
                メール: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </p>
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
                  <div>お名前</div>
                  <div>
                    <input type="text" name="name" maxLength={100} />
                  </div>
                  <div className={styles.error}>{error?.name ?? ""}</div>
                </div>
                <div className={styles["form-grid"]}>
                  <div>メールアドレス</div>
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
                  <div>内容</div>
                  <div>
                    <textarea rows={8} name="content" maxLength={800} />
                  </div>
                  <div></div>
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
