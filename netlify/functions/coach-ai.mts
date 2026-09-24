import type { Config, Context } from '@netlify/functions';

export default async (req: Request, context: Context) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { message, userProfile } = await req.json();
    const prompt = (message || '').toLowerCase();
    const userName = userProfile?.firstName || 'Guerrier';

    let reply = '';
    let action = 'none';

    if (prompt.includes('20 min') || prompt.includes('20min') || prompt.includes('court') || prompt.includes('pressé')) {
      reply = `Pas de souci ${userName} ! J'ai reconfiguré ta séance en mode Express 15-20 min : 1 échauffement réactif, 3 mouvements composés à haute intensité et 1 retour au calme. Prêt à tout exploser ?`;
      action = 'express_workout';
    } else if (prompt.includes('haltère') || prompt.includes('haltere') || prompt.includes('matériel') || prompt.includes('materiel')) {
      reply = `Reçu 5/5 ${userName} ! On bascule en 100% Calisthénie (poids de corps). Tes exercices de tirage et de poussée sont adaptés au sol et sur appuis naturels. C'est l'essence du guerrier cyberpunk !`;
      action = 'bodyweight_mode';
    } else if (prompt.includes('genou') || prompt.includes('mal') || prompt.includes('blessure') || prompt.includes('douleur')) {
      reply = `Attention primordiale ${userName}. Je suis un coach virtuel et je ne remplace JAMAIS un médecin ou kinésithérapeute. Pour protéger ton articulation, j'ai écarté les fentes et sauts violents au profit de gainage et renforcement fessier isométrique. Si la douleur persiste, consulte un professionnel de santé.`;
      action = 'safety_filter';
    } else if (prompt.includes('fatigué') || prompt.includes('flemme') || prompt.includes('motivation')) {
      reply = `C'est exactement dans ces moments-là que ton personnage gagne les points de volonté les plus précieux ! Même 10 petites minutes suffisent pour valider ta série et maintenir ta flamme. Lance la séance, fais ce que tu peux, ton avatar sera fier !`;
      action = 'motivate';
    } else {
      reply = `Bien reçu ${userName} ! Tes retours sont intégrés à ton journal d'entraînement. Concentre-toi sur une exécution propre, un gainage solide et une respiration fluide. Chaque répétition te rapproche du prochain niveau !`;
    }

    return new Response(
      JSON.stringify({
        success: true,
        reply,
        action,
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Erreur de traitement interne',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

export const config: Config = {
  path: '/api/coach-ai',
  method: 'POST',
};
