// interface Avaliacao {
//   nota: number;
// }

// export interface AvaliacoesStates {
//   media: number;
//   total: number;
//   distribuicao: {
//     1: number;
//     2: number;
//     3: number;
//     4: number;
//     5: number;
//   };
//   porcentagens: {
//     1: number;
//     2: number;
//     3: number;
//     4: number;
//     5: number;
//   };
// }
// /**
//  * Calcula estatísticas completas do rating
//  */
// export function calculateRatingStates(ratings: Avaliacao[]): AvaliacoesStates {
//   if (!ratings || ratings.length === 0) {
//     return {
//       media: 0,
//       total: 0,
//       distribuicao: {
//         1: 0,
//         2: 0,
//         3: 0,
//         4: 0,
//         5: 0,
//       },
//       porcentagens: {
//         1: 0,
//         2: 0,
//         3: 0,
//         4: 0,
//         5: 0,
//       },
//     };
//   }

//   // Calcular média
//   const total = ratings.reduce((sum, r) => sum + r.nota, 0);
//   const media = total / ratings.length;

//   // Contar distribuição por estrelas
//   const distribuicao = {
//     1: 0,
//     2: 0,
//     3: 0,
//     4: 0,
//     5: 0,
//   };

//   ratings.forEach((rating) => {
//     const nota = rating.nota;
//     if (nota >= 1 && nota <= 5) {
//       distribuicao[nota as keyof typeof distribuicao]++;
//     }
//   });

//   // Calcular percentuais
//   const porcentagens = {
//     1: Math.round((distribuicao[1] / ratings.length) * 100),
//     2: Math.round((distribuicao[2] / ratings.length) * 100),
//     3: Math.round((distribuicao[3] / ratings.length) * 100),
//     4: Math.round((distribuicao[4] / ratings.length) * 100),
//     5: Math.round((distribuicao[5] / ratings.length) * 100),
//   };

//   return {
//     media: Math.round(media * 10) / 10, // Arredonda para 1 casa decimal
//     total: ratings.length,
//     distribuicao,
//     porcentagens,
//   };
// }
