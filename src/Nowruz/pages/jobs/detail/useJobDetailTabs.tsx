import { useCallback, useEffect, useMemo, useState } from 'react';
import { Applicant, Job, jobApplicants } from 'src/core/api';
import Badge from 'src/Nowruz/modules/general/components/Badge';
import { JobDetailAbout } from 'src/Nowruz/modules/Jobs/components/jobDetailAbout';
import { JobDetailDescription } from 'src/Nowruz/modules/Jobs/components/jobDetailDescription';

import { Cards } from './applicants/cards';
import { Table } from './applicants/table';
import css from './jobDetail.module.scss';

export const useJobDetailTabs = (jobDetail: Job, isUser: boolean) => {
  const [applicants, setApplicants] = useState([] as Applicant[]);
  const [rejected, setRejected] = useState([] as Applicant[]);
  const [offered, setOffered] = useState([] as Applicant[]);
  const [refetch, setRefetch] = useState(false);

  const overviewJSX = () => {
    return (
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className={css.description}>
          <JobDetailDescription jobDescription={jobDetail.description} />
        </div>
        <div className="md:mr-16">
          <JobDetailAbout isUser={isUser} />
        </div>
      </div>
    );
  };

  const applicantsJSX = useCallback(
    (data: Array<Applicant>, tab: string) => {
      return (
        <>
          <Cards applicants={data} currentTab={tab} onRefetch={setRefetch} />
          <Table applicants={data} currentTab={tab} onRefetch={setRefetch} />
        </>
      );
    },
    [applicants, rejected],
  );

  const tabs = useMemo(() => {
    return [
      {
        label: 'Overview',
        content: overviewJSX(),
      },
      {
        label: (
          <>
            Applicants
            {!!applicants.length && (
              <div className="ml-2 hidden md:block">
                <Badge content={applicants.length.toString()} />
              </div>
            )}
          </>
        ),
        content: applicantsJSX(applicants, 'applicants'),
      },
      { label: 'Offered', content: applicantsJSX(offered, 'offered') },
      { label: 'Rejected', content: applicantsJSX(rejected, 'rejected') },
    ];
  }, [applicants, applicantsJSX, offered, rejected]);

  const getApplicants = useCallback(async () => {
    const data = await jobApplicants(jobDetail.id, { page: 1, status: 'PENDING', limit: 100 });
    setApplicants(data.items);
  }, [jobDetail.id]);

  const getOffered = useCallback(async () => {
    const data = await jobApplicants(jobDetail.id, { page: 1, status: 'OFFERED', limit: 100 });
    setOffered(data.items);
  }, [jobDetail.id]);

  const getRejected = useCallback(async () => {
    const data = await jobApplicants(jobDetail.id, { page: 1, status: 'REJECTED', limit: 100 });
    setRejected(data.items);
  }, [jobDetail.id]);

  useEffect(() => {
    if (jobDetail.id || refetch === true) {
      Promise.all([getApplicants(), getOffered(), getRejected()]).then(() => {
        setRefetch(false);
      });
    }
  }, [getApplicants, getOffered, getRejected, jobDetail, refetch]);

  return {
    tabs,
    setRefetch,
  };
};
