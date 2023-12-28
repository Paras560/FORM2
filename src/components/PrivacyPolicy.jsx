import React from 'react'
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export default function PrivacyPolicy({ className }) {
    const { t } = useTranslation()

    return (
      <div className={cn(className)}>
        <div className="flex flex-col items-start py-2">
          <b>{t("TermsFirst")}</b>
          <p> </p>
          <ol class="list-decimal pl-6">
            <li className="text-left">
              <b>{t("terms.1name")}</b>
              <p>{t("terms.1")}</p>
              <ol className="list-decimal pl-6">
                <li>{t("terms.1a")}</li>
                <li>{t("terms.1b")}</li>
                <li>{t("terms.1c")}</li>
                <li>{t("terms.1d")}</li>
              </ol>
            </li>
            <li className="text-left">
              <b>{t("terms.2name")}</b>
              <br />
              <p>{t("terms.2")}</p>
            </li>
            <li className="text-left">
              <b>{t("terms.3name")}</b>
              <p>{t("terms.3")}</p>
              <ol className="list-decimal pl-6">
                <li>{t("terms.3a")}</li>
                <li>{t("terms.3b")}</li>
                <li>{t("terms.3c")}</li>
                <li>{t("terms.3d")}</li>
                <li>{t("terms.3e")}</li>
              </ol>
            </li>
            <li className="text-left">
              <b>{t("terms.4name")}</b>
              <br />
              <p>{t("terms.4")}</p>
            </li>
            <li className="text-left">
              <b>{t("terms.5name")}</b>
              <br />
              <p>{t("terms.5")}</p>
            </li>
            <li className="text-left">
              <b>{t("terms.6name")}</b>
              <br />
              <p>{t("terms.6")}</p>
            </li>
            <li className="text-left">
              <b>{t("terms.7name")}</b>
              <br />
              <p>{t("terms.7")}</p>
            </li>
          </ol>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("secondTerms.title")}</b>
          <p>{t("secondTerms.description")}</p>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("thirdTerms.title")}</b>
          <p>{t("thirdTerms.description")}</p>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("fourthTerms.title")}</b>
          <p>{t("fourthTerms.description")}</p>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("fifthTerms.title")}</b>
          <p>{t("fifthTerms.description")}</p>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("sixthTerms.title")}</b>
          <p>{t("sixthTerms.description")}</p>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("seventhTerms.title")}</b>
          <p>{t("seventhTerms.description")}</p>
          <ol className="list-decimal pl-6">
            <li>{t("seventhTerms.1")}</li>
            <li>{t("seventhTerms.2")}</li>
            <li>{t("seventhTerms.3")}</li>
          </ol>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("eigthTerms.title")}</b>
          <ol className="list-decimal pl-6">
            <li>{t("eigthTerms.1")}</li>
            <li>{t("eigthTerms.2")}</li>
            <li>{t("eigthTerms.3")}</li>
          </ol>
        </div>
        <div className="flex flex-col items-start text-left py-2">
          <b>{t("ninthTerms.title")}</b>
          <ol className="list-decimal pl-6">
            <li>{t("ninthTerms.1")}</li>
            <li>{t("ninthTerms.2")}</li>
            <li>{t("ninthTerms.3")}</li>
          </ol>
        </div>
      </div>
    );
}