'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const prisma = new PrismaClient();

export async function addEvent(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const eventUrl = formData.get('eventUrl') as string;
    const dateString = formData.get('date') as string;
    console.log({ title, imageUrl, eventUrl, dateString });

    if (!title || typeof title !== 'string') {
      throw new Error('El título es requerido y debe ser un string.');
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('La URL de la imagen es requerida y debe ser un string.');
    }

    if (!eventUrl || typeof eventUrl !== 'string') {
      throw new Error('La URL del evento es requerida y debe ser un string.');
    }

    if (!dateString || isNaN(new Date(dateString).getTime())) {
      throw new Error('La fecha es requerida y debe ser válida.');
    }

    const date = new Date(dateString);

    await prisma.event.create({
      data: {
        title,
        imageUrl,
        eventUrl,
        date,
        category: {
          connect: {
            id: 1
          }
        }
      }
    });

    revalidatePath('/info');
  } catch (error) {
    console.error('Error al agregar el evento:', error);
    console.error(
      'Tipo de error:',
      typeof error,
      'Contenido del error:',
      error
    );
  } finally {
    redirect('/dashboard/info');
  }
}

export async function deleteEvent(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  console.log({ id });
  try {
    await prisma.event.delete({
      where: {
        id
      }
    });
    revalidatePath('/info');
  } catch (error) {
    console.error(error);
  }
}

export async function updateEvent(formData: FormData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const imageUrl = formData.get('imageUrl');
  const eventUrl = formData.get('eventUrl');
  const dateString = formData.get('date') as string;

  if (!id || typeof id !== 'string') {
    throw new Error('El ID es requerido.');
  }
  if (!title || typeof title !== 'string') {
    throw new Error('El título es requerido y debe ser un string.');
  }
  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error('La URL de la imagen es requerida y debe ser un string.');
  }
  if (!eventUrl || typeof eventUrl !== 'string') {
    throw new Error('La URL del evento es requerida y debe ser un string.');
  }
  if (!dateString || isNaN(new Date(dateString).getTime())) {
    throw new Error('La fecha es requerida y debe ser válida.');
  }

  const date = new Date(dateString);

  try {
    await prisma.event.update({
      where: {
        id: Number(id)
      },
      data: {
        title: title as string,
        imageUrl: imageUrl as string,
        eventUrl: eventUrl as string,
        date: date as Date
      }
    });
    console.log('Event updated');
  } catch (error) {
    console.error('Error updating event:', error);
  } finally {
    redirect('/dashboard/info');
  }
}
export async function addNew(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const eventUrl = formData.get('eventUrl') as string;
    const dateString = formData.get('date') as string;
    console.log({ title, imageUrl, eventUrl, dateString });

    if (!title || typeof title !== 'string') {
      throw new Error('El título es requerido y debe ser un string.');
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('La URL de la imagen es requerida y debe ser un string.');
    }

    if (!eventUrl || typeof eventUrl !== 'string') {
      throw new Error('La URL del evento es requerida y debe ser un string.');
    }

    if (!dateString || isNaN(new Date(dateString).getTime())) {
      throw new Error('La fecha es requerida y debe ser válida.');
    }

    const date = new Date(dateString);

    await prisma.event.create({
      data: {
        title,
        imageUrl,
        eventUrl,
        date,
        category: {
          connect: {
            id: 2
          }
        }
      }
    });

    revalidatePath('/info');
  } catch (error) {
    console.error('Error al agregar el evento:', error);
    console.error(
      'Tipo de error:',
      typeof error,
      'Contenido del error:',
      error
    );
  } finally {
    redirect('/dashboard/info');
  }
}

export async function deleteNew(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  console.log({ id });
  try {
    await prisma.event.delete({
      where: {
        id
      }
    });
    revalidatePath('/info');
  } catch (error) {
    console.error(error);
  }
}

export async function updateNew(formData: FormData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const imageUrl = formData.get('imageUrl');
  const eventUrl = formData.get('eventUrl');
  const dateString = formData.get('date') as string;

  if (!id || typeof id !== 'string') {
    throw new Error('El ID es requerido.');
  }
  if (!title || typeof title !== 'string') {
    throw new Error('El título es requerido y debe ser un string.');
  }
  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error('La URL de la imagen es requerida y debe ser un string.');
  }
  if (!eventUrl || typeof eventUrl !== 'string') {
    throw new Error('La URL del evento es requerida y debe ser un string.');
  }
  if (!dateString || isNaN(new Date(dateString).getTime())) {
    throw new Error('La fecha es requerida y debe ser válida.');
  }

  const date = new Date(dateString);

  try {
    await prisma.event.update({
      where: {
        id: Number(id)
      },
      data: {
        title: title as string,
        imageUrl: imageUrl as string,
        eventUrl: eventUrl as string,
        date: date as Date
      }
    });
    console.log('Event updated');
  } catch (error) {
    console.error('Error updating event:', error);
  } finally {
    redirect('/dashboard/info');
  }
}
export async function addPromotion(formData: FormData) {
  try {
    const title = formData.get('title') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const eventUrl = formData.get('eventUrl') as string;
    const dateString = formData.get('date') as string;
    console.log({ title, imageUrl, eventUrl, dateString });

    if (!title || typeof title !== 'string') {
      throw new Error('El título es requerido y debe ser un string.');
    }

    if (!imageUrl || typeof imageUrl !== 'string') {
      throw new Error('La URL de la imagen es requerida y debe ser un string.');
    }

    if (!eventUrl || typeof eventUrl !== 'string') {
      throw new Error('La URL del evento es requerida y debe ser un string.');
    }

    if (!dateString || isNaN(new Date(dateString).getTime())) {
      throw new Error('La fecha es requerida y debe ser válida.');
    }

    const date = new Date(dateString);

    await prisma.event.create({
      data: {
        title,
        imageUrl,
        eventUrl,
        date,
        category: {
          connect: {
            id: 3
          }
        }
      }
    });

    revalidatePath('/info');
  } catch (error) {
    console.error('Error al agregar el evento:', error);
    console.error(
      'Tipo de error:',
      typeof error,
      'Contenido del error:',
      error
    );
  } finally {
    redirect('/dashboard/info');
  }
}

export async function deletePromotion(formData: FormData) {
  const id = parseInt(formData.get('id') as string);
  console.log({ id });
  try {
    await prisma.event.delete({
      where: {
        id
      }
    });
    revalidatePath('/info');
  } catch (error) {
    console.error(error);
  }
}

export async function updatePromotion(formData: FormData) {
  const id = formData.get('id');
  const title = formData.get('title');
  const imageUrl = formData.get('imageUrl');
  const eventUrl = formData.get('eventUrl');
  const dateString = formData.get('date') as string;

  if (!id || typeof id !== 'string') {
    throw new Error('El ID es requerido.');
  }
  if (!title || typeof title !== 'string') {
    throw new Error('El título es requerido y debe ser un string.');
  }
  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error('La URL de la imagen es requerida y debe ser un string.');
  }
  if (!eventUrl || typeof eventUrl !== 'string') {
    throw new Error('La URL del evento es requerida y debe ser un string.');
  }
  if (!dateString || isNaN(new Date(dateString).getTime())) {
    throw new Error('La fecha es requerida y debe ser válida.');
  }

  const date = new Date(dateString);

  try {
    await prisma.event.update({
      where: {
        id: Number(id)
      },
      data: {
        title: title as string,
        imageUrl: imageUrl as string,
        eventUrl: eventUrl as string,
        date: date as Date
      }
    });
    console.log('Event updated');
  } catch (error) {
    console.error('Error updating event:', error);
  } finally {
    redirect('/dashboard/info');
  }
}
