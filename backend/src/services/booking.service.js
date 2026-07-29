import Booking from "../models/Booking.js";
import {
  createBooking,
  getUserBookings,
  getTrainerBookings,
  findBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../repositories/booking.repository.js";
import { createNotification } from "../repositories/notification.repository.js";

const ACTIVE_STATUSES = new Set(["PENDING", "ACCEPTED"]);

const formatBookingLabel = (booking) => {
  const trainerName = booking?.trainerId?.userId?.name || "your trainer";
  const dateLabel = booking?.date ? new Date(booking.date).toDateString() : "unknown date";
  return `${trainerName} on ${dateLabel} at ${booking?.time || "unknown time"}`;
};

export const createBookingWithUser = async (userId, data) => {
  return createBooking({
    userId,
    ...data,
  });
};

export const syncExpiredBookings = async ({ userId, trainerId } = {}) => {
  const now = new Date();

  const filter = {
    status: { $in: Array.from(ACTIVE_STATUSES) },
    date: { $lte: now },
    reminderSentAt: null,
  };

  if (userId) {
    filter.userId = userId;
  }

  if (trainerId) {
    filter.trainerId = trainerId;
  }

  const bookings = await Booking.find(filter).populate({
    path: "trainerId",
    populate: {
      path: "userId",
      select: "name email profileImage",
    },
  });

  if (!bookings.length) {
    return [];
  }

  const expiredBookings = [];

  for (const booking of bookings) {
    booking.status = "EXPIRED";
    booking.reminderSentAt = now;
    await booking.save();

    expiredBookings.push(booking);

    await createNotification({
      userId: booking.userId,
      title: "Booking time reached",
      message: `${formatBookingLabel(booking)} has expired.`,
      type: "BOOKING",
    });
  }

  return expiredBookings;
};

export const bookTrainer = async (userId, data) => {
  return createBookingWithUser(userId, data);
};

export const myBookings = async (userId) => {
  await syncExpiredBookings({ userId });
  return getUserBookings(userId);
};

export const trainerBookings = async (trainerId) => {
  return getTrainerBookings(trainerId);
};

export const changeStatus = async (id, status) => {
  const booking = await findBookingById(id);

  if (!booking) {
    throw new Error("Booking not found");
  }

  return updateBookingStatus(id, status);
};

export const cancelBooking = async (id) => {
  return deleteBooking(id);
};
