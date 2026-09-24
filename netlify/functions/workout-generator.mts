import type { Config, Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const profile = await req.json();

    const goal = profile.mainGoal || 'musculation';
    const duration = profile.preferredDuration || 30;
    const level = profile.fitnessLevel || 'debutant';

    return new Response(
      JSON.stringify({
        success: true,
        program: {
          title: `Full Body – ${duration} min`,
          durationMinutes: duration,
          fitnessLevel: level === 'debutant' ? 'Débutant' : level === 'intermediaire' ? 'Intermédiaire' : 'Avancé',
          equipment: profile.equipment === 'aucun' ? 'Sans matériel' : profile.equipment,
          xpReward: duration >= 45 ? 400 : duration >= 30 ? 300 : 200,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(JSON.stringify({ error: 'Erreur génération' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

export const config: Config = {
  path: '/api/generate-program',
  method: 'POST',
};
