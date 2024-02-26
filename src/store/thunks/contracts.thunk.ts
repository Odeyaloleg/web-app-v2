import { createAsyncThunk } from '@reduxjs/toolkit';
import { ContractStatus, MissionStatus, OfferStatus, userOffers } from 'src/core/api';

export function getContractStatus(
  identityType: 'users' | 'organizations',
  paymentType: 'VOLUNTEER' | 'PAID',
  offerStatus: OfferStatus,
  missionStatus?: MissionStatus,
): ContractStatus {
  let status: ContractStatus = 'Closed';
  if (identityType === 'users') {
    switch (offerStatus) {
      case 'PENDING':
        status = 'Offer received';
        break;
      case 'APPROVED':
        status = 'Awaiting confirmation';
        break;
      case 'HIRED':
        status = 'Ongoing';
        break;
      case 'CANCELED':
        status = 'Canceled';
        break;
      case 'WITHDRAWN':
        status = 'Withdrawn';
        break;
      case 'CLOSED':
        if (missionStatus === 'CONFIRMED') status = 'Completed';
        else if (missionStatus === 'CANCELED') status = 'Canceled';
        else if (missionStatus === 'KICKED_OUT') status = 'Kicked out';
        else if (missionStatus === 'COMPLETE') status = 'Awaiting confirmation';
        else status = 'Closed';
        break;
    }
  } else {
    switch (offerStatus) {
      case 'PENDING':
        status = 'Offer sent';
        break;
      case 'APPROVED':
        if (paymentType === 'PAID') status = 'Payment required';
        else status = 'Awaiting confirmation';
        break;
      case 'HIRED':
        if (missionStatus === 'ACTIVE') status = 'Ongoing';
        break;
      case 'CANCELED':
        status = 'Canceled';
        break;
      case 'WITHDRAWN':
        status = 'Withdrawn';
        break;
      case 'CLOSED':
        if (missionStatus === 'CONFIRMED') status = 'Completed';
        else if (missionStatus === 'CANCELED') status = 'Canceled';
        else if (missionStatus === 'KICKED_OUT') status = 'Kicked out';
        else if (missionStatus === 'COMPLETE') status = 'Awaiting confirmation';
        else status = 'Closed';
        break;
    }
  }
  return status;
}

export const getContracts = createAsyncThunk(
  'contracts/get',
  async (params: { page: number; limit: number; identityType: 'users' | 'organizations' }) => {
    const { page, limit, identityType } = params;
    const offers = await userOffers({ page, limit });
    const contracts = offers.items.map((item) => {
      return {
        ...item,
        contractStatus: getContractStatus(identityType, item.project.payment_type, item.status, item.mission?.status),
      };
    });
    return {
      offers: contracts,
      page,
      limit,
      totalCount: offers.total_count,
    };
  },
);
