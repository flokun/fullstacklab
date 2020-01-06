<?php

namespace App\DataFixtures;

use App\Entity\BienImmobilier;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Bundle\FixturesBundle\FixtureGroupInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Finder\Finder;

class BienImmobilierFixtures extends Fixture implements FixtureGroupInterface
{
    public function load(ObjectManager $manager)
    {
        ini_set('memory_limit', '-1');

        $manager->getConnection()->getConfiguration()->setSQLLogger(null);

        $finder = new Finder();
        $finder->files()->in('resources/prod');

        foreach ($finder as $file) {
            $handle = fopen($file->getRealPath(), 'r');

            if ($handle) {
                $numeroLigne = 0;

                while (($ligne = fgets($handle)) !== false) {
                    if ($numeroLigne > 0) {
                        $infos = explode('|', $ligne);

                        $bienImmobilier = new BienImmobilier();

                        $bienImmobilier->setNumDispo((int)$infos[8])
                            ->setDateMutation(\DateTime::createFromFormat('d/m/Y', $infos[8])) //L'heure dans la date correspond à la date d'insertion dans la bdd
                            ->setNatureMutation($infos[9])
                            ->setValeurFonciere((float)$infos[10])
                            ->setCodePostal((int)$infos[16])
                            ->setCodeDepartement((int)$infos[18])
                            ->setCodeCommune($infos[19])
                            ->setSurfaceReelleBati((int)$infos[38])
                            ->setSurfaceTerrain((int)$infos[42])
                            ->setTypeBien((int)$infos[36]);

                        $manager->persist($bienImmobilier);

                        if ($numeroLigne % 25 == 0) {
                            //echo $numeroLigne . "\n";
                            $manager->flush();
                            $manager->clear();
                        }
                    }

                    $numeroLigne++;
                }

                fclose($handle);
            }

            break;
        }

        $manager->flush();
    }

    /**
     * This method must return an array of groups
     * on which the implementing class belongs to
     *
     * @return string[]
     */
    public static function getGroups(): array
    {
        return ['prod'];
    }
}
