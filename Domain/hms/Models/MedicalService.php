<?php
namespace Domain\hms\Model;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity
 */
class MedicalService
{
    public function __construct()
    {
        $this->locations = new ArrayCollection();
        $this->visits = new ArrayCollection();
    }
    
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue
     */
    private $id;

    /**
     * @ORM\Column(length=50)
     */
    private $name;

    /**
     * @ORM\Column(type="integer")
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity="Visit", mappedBy="requestedService")
     */
    private $visits;

    /**
     * @ORM\OneToMany(targetEntity="Room", mappedBy="medicalService")
     */ 
    private $locations;

    /**
     * @ORM\Column(type="integer")
     */
    private $noOfPatients;

    /**
     * @ORM\Column(type="integer")
     */
    private $noOfRooms;

    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of name
     */ 
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set the value of name
     *
     * @return  self
     */ 
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get the value of price
     */ 
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set the value of price
     *
     * @return  self
     */ 
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get the value of visits
     */ 
    public function getVisits()
    {
        return $this->visits;
    }

    /**
     * Set the value of visits
     *
     * @return  self
     */ 
    public function setVisits($visits)
    {
        $this->visits = $visits;

        return $this;
    }

    /**
     * Get the value of locations
     */ 
    public function getLocations()
    {
        return $this->locations;
    }

    /**
     * Set the value of locations
     *
     * @return  self
     */ 
    public function setLocations($locations)
    {
        $this->locations = $locations;

        return $this;
    }

    /**
     * Get the value of noOfPatients
     */ 
    public function getNoOfPatients()
    {
        return $this->noOfPatients;
    }

    /**
     * Set the value of noOfPatients
     *
     * @return  self
     */ 
    public function setNoOfPatients($noOfPatients)
    {
        $this->noOfPatients = $noOfPatients;

        return $this;
    }

    /**
     * Get the value of noOfRooms
     */ 
    public function getNoOfRooms()
    {
        return $this->noOfRooms;
    }

    /**
     * Set the value of noOfRooms
     *
     * @return  self
     */ 
    public function setNoOfRooms($noOfRooms)
    {
        $this->noOfRooms = $noOfRooms;

        return $this;
    }
}
