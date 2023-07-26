import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Header } from 'src/components/atoms/header-v2/header';
import { Tabs } from 'src/components/atoms/tabs/tabs';
import { Applicants } from '../components/applicants/applicants';
import { Hired } from '../components/hired/hired';
import { Offered } from '../components/offered/offered';
import { Overview } from '../components/overview/overview';
import { Loader } from '../../job-offer-reject.types';
import { jobOfferRejectLoader, rejectApplicant } from '../../job-offer-reject.services';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const resolver = useMatch().ownData as Loader;
  const { id } = useMatch().params || {};
  const tab = useMatch()?.search?.tab as string;
  const defaultTab = tab || 'Overview';
  const [updatedApplicantList, setUpdatedApplicantList] = useState<Loader>(resolver);

  async function updateApplicantList() {
    const result = await jobOfferRejectLoader({ params: { id } });
    setUpdatedApplicantList(result);
  }

  async function onRejectClick(id: string) {
    await rejectApplicant(id);
    updateApplicantList();
  }

  const tabs = [
    {
      name: 'Overview',
      content: (
        <Overview
          questions={updatedApplicantList.screeningQuestions.questions}
          data={updatedApplicantList.jobOverview}
        />
      ),
      default: defaultTab === 'Overview',
    },
    {
      name: 'Applicants',
      content: (
        <Applicants
          toReviewList={updatedApplicantList.reviewList}
          declinedList={updatedApplicantList.declinedList}
          onOfferClick={(id) => navigate({ to: `./${id}/offer` })}
          onRejectClick={onRejectClick}
        />
      ),
      default: defaultTab === 'Applicants',
    },
    {
      name: 'Offered',
      content: (
        <Offered
          sent={updatedApplicantList.sent}
          approved={updatedApplicantList.approved}
          hired={updatedApplicantList.hired}
          closed={updatedApplicantList.closed}
        />
      ),
      default: defaultTab === 'Offered',
    },
    {
      name: 'Hired',
      content: (
        <Hired
          hiredList={updatedApplicantList.hiredList}
          endHiredList={updatedApplicantList.endHiredList}
          onDone={updateApplicantList}
        />
      ),
      default: defaultTab === 'Hired',
    },
  ];

  return (
    <TopFixedMobile>
      <Header removeBorder title={updatedApplicantList.jobOverview.title} />
      <Tabs tabs={tabs} onClick={(name) => navigate({ to: '.', search: { tab: name }, replace: true })} />
    </TopFixedMobile>
  );
};
