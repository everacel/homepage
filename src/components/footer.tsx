"use client";

import { EMAIL, TEL } from "@/utils/const";
import styles from "./footer.module.css";
import Logo from "./logo";
import Link from "next/link";

export function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.logo}>
        <Logo size={18} />
        <h2>EVERACEL</h2>
      </div>
      {/* <p>Everacel Co., Ltd.</p> */}
      <p>
        電話：<a href={`tel:${TEL}`}>{TEL}</a>
      </p>
      <p>
        メール: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
      <Link href="/jp/privacy-policy" target="blank">
        PRIVACY POLICY
      </Link>
    </div>
  );
}
