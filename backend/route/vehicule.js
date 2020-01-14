const express = require("express");
const { connection } = require("../conf");
const router = express.Router();

// route du plan de maintenance du vehicule de l'user
router.get("/:id/nextmaintenance", (req, res) => {
  const id = req.params.id;
  // connection à la base de données, et sélection des informations du vehicules
  connection.query(
    `SELECT plan_maintenance_interventions.km_periodicite , INTERVENTION.famille,INTERVENTION.sousFamille, INTERVENTION.elements, EXEMPLAIRE_VOITURE.km
    FROM EXEMPLAIRE_VOITURE
    INNER JOIN MODELE_VOITURE ON EXEMPLAIRE_VOITURE.id_modele_voiture = MODELE_VOITURE.id 
    INNER JOIN PLAN_MAINTENANCE ON MODELE_VOITURE.id = PLAN_MAINTENANCE.id_modele_voiture
    INNER JOIN plan_maintenance_interventions ON PLAN_MAINTENANCE.id = plan_maintenance_interventions.id_plan_maintenance
    INNER JOIN INTERVENTION ON plan_maintenance_interventions.id_intervention = INTERVENTION.id
    WHERE EXEMPLAIRE_VOITURE.id = ?
    ORDER BY plan_maintenance_interventions.km_periodicite  
      `,
    id,
    (err, results) => {
      if (err) {
        // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
        res.status(500).send("Error in vehicles of user");
      }
      const listNextMaintenance = [];
      results.forEach(element => {
        const prochaineEcheance =
          element.km_periodicite - (element.km % element.km_periodicite);
        listNextMaintenance.push({
          famille: element.famille,
          sousFamille: element.sousFamille,
          elements: element.elements,
          prochaineEcheance
        });
      });
      res.json(listNextMaintenance);
    }
  );
});

module.exports = router;