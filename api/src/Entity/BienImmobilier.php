<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\BienImmobilierRepository")
 */
class BienImmobilier
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $numDispo;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateMutation;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $natureMutation;

    /**
     * @ORM\Column(type="float")
     */
    private $valeurFonciere;

    /**
     * @ORM\Column(type="integer")
     */
    private $numVoie;

    /**
     * @ORM\Column(type="integer")
     */
    private $codePostal;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $commune;

    /**
     * @ORM\Column(type="integer")
     */
    private $codeDepartement;

    /**
     * @ORM\Column(type="integer")
     */
    private $codeCommune;

    /**
     * @ORM\Column(type="integer")
     */
    private $surfaceReelleBati;

    /**
     * @ORM\Column(type="integer")
     */
    private $nombrePieces;

    /**
     * @ORM\Column(type="integer")
     */
    private $surfaceTerrain;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumDispo(): ?int
    {
        return $this->numDispo;
    }

    public function setNumDispo(?int $numDispo): self
    {
        $this->numDispo = $numDispo;

        return $this;
    }

    public function getDateMutation(): ?\DateTimeInterface
    {
        return $this->dateMutation;
    }

    public function setDateMutation(?\DateTimeInterface $dateMutation): self
    {
        $this->dateMutation = $dateMutation;

        return $this;
    }

    public function getNatureMutation(): ?string
    {
        return $this->natureMutation;
    }

    public function setNatureMutation(string $natureMutation): self
    {
        $this->natureMutation = $natureMutation;

        return $this;
    }

    public function getValeurFonciere(): ?float
    {
        return $this->valeurFonciere;
    }

    public function setValeurFonciere(float $valeurFonciere): self
    {
        $this->valeurFonciere = $valeurFonciere;

        return $this;
    }

    public function getNumVoie(): ?int
    {
        return $this->numVoie;
    }

    public function setNumVoie(int $numVoie): self
    {
        $this->numVoie = $numVoie;

        return $this;
    }

    public function getCodePostal(): ?int
    {
        return $this->codePostal;
    }

    public function setCodePostal(int $codePostal): self
    {
        $this->codePostal = $codePostal;

        return $this;
    }

    public function getCommune(): ?string
    {
        return $this->commune;
    }

    public function setCommune(string $commune): self
    {
        $this->commune = $commune;

        return $this;
    }

    public function getCodeDepartement(): ?int
    {
        return $this->codeDepartement;
    }

    public function setCodeDepartement(int $codeDepartement): self
    {
        $this->codeDepartement = $codeDepartement;

        return $this;
    }

    public function getCodeCommune(): ?int
    {
        return $this->codeCommune;
    }

    public function setCodeCommune(int $codeCommune): self
    {
        $this->codeCommune = $codeCommune;

        return $this;
    }

    public function getSurfaceReelleBati(): ?int
    {
        return $this->surfaceReelleBati;
    }

    public function setSurfaceReelleBati(int $surfaceReelleBati): self
    {
        $this->surfaceReelleBati = $surfaceReelleBati;

        return $this;
    }

    public function getNombrePieces(): ?int
    {
        return $this->nombrePieces;
    }

    public function setNombrePieces(int $nombrePieces): self
    {
        $this->nombrePieces = $nombrePieces;

        return $this;
    }

    public function getSurfaceTerrain(): ?int
    {
        return $this->surfaceTerrain;
    }

    public function setSurfaceTerrain(int $surfaceTerrain): self
    {
        $this->surfaceTerrain = $surfaceTerrain;

        return $this;
    }
}
